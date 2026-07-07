const prisma = require("../config/prisma");
const { generateInvoiceNumber } = require("../utils/invoiceGenerator");
const { getPagination } = require("../utils/pagination");
const { getSort } = require("../utils/sort");
const { contains } = require("../utils/search");
const { getDateRangeFilter } = require("../utils/dateFilter");
const stockService = require("./stockService");
const AppError = require("../utils/appError");

const PAYMENT_METHODS = ["CASH", "GCASH", "BANK_TRANSFER"];
const SALE_STATUSES = ["COMPLETED", "VOIDED"];

function buildSalesWhere(query) {

    const conditions = [];

    if (query.search) {
        conditions.push({
            OR: [
                { customerName: contains(query.search) },
                { invoiceNo: contains(query.search) }
            ]
        });
    }

    if (query.paymentMethod) {
        if (!PAYMENT_METHODS.includes(query.paymentMethod)) {
            throw new AppError("Invalid payment method filter.", 400);
        }

        conditions.push({
            paymentMethod: query.paymentMethod
        });
    }

    if (query.status) {
        if (!SALE_STATUSES.includes(query.status)) {
            throw new AppError("Invalid sale status filter.", 400);
        }

        conditions.push({
            status: query.status
        });
    }

    const createdAt = getDateRangeFilter(query.from, query.to);

    if (createdAt) {
        conditions.push({ createdAt });
    }

    if (!conditions.length) {
        return undefined;
    }

    return {
        AND: conditions
    };

}

function normalizeSaleItems(items) {

    const mergedItems = new Map();

    for (const item of items) {
        const currentQuantity = mergedItems.get(item.productId) || 0;
        mergedItems.set(item.productId, currentQuantity + item.quantity);
    }

    return Array.from(mergedItems.entries()).map(([productId, quantity]) => ({
        productId,
        quantity
    }));

}

async function getSales(query) {
    const { page, limit, skip } = getPagination(query);
    const where = buildSalesWhere(query);

    const sales = await prisma.sale.findMany({
        skip,
        take: limit,
        orderBy: getSort(query),
        where,
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    const total = await prisma.sale.count({ where });

    return {
        sales,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

async function getSaleById(id) {
    const sale = await prisma.sale.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!sale) {
        throw new AppError("Sale not found.", 404);
    }

    return sale;
}

async function createSale(data) {
    const normalizedItems = normalizeSaleItems(data.items);
    const productIds = normalizedItems.map(item => item.productId);

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    if (products.length !== productIds.length) {
        throw new AppError("One or more products were not found.", 404);
    }

    let totalAmount = 0;
    const saleItems = [];

    for (const item of normalizedItems) {
        const product = products.find(p => p.id === item.productId);

        if (!product.isActive) {
            throw new AppError(
                `${product.name} is not available for sale.`,
                400
            );
        }

        if (product.stockQuantity < item.quantity) {
            throw new AppError(
                `${product.name} has insufficient stock.`,
                400
            );
        }

        const unitPrice = Number(product.sellingPrice);
        const subtotal = unitPrice * item.quantity;
        totalAmount += subtotal;

        saleItems.push({
            productId: product.id,
            quantity: item.quantity,
            unitPrice,
            subtotal
        });
    }

    return prisma.$transaction(async (tx) => {
        const invoiceNo = await generateInvoiceNumber(tx);

        const sale = await tx.sale.create({
            data: {
                invoiceNo,
                customerName: data.customerName || null,
                paymentMethod: data.paymentMethod,
                totalAmount,
                remarks: data.remarks || null
            }
        });

        for (const item of saleItems) {
            await tx.saleItem.create({
                data: {
                    saleId: sale.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    subtotal: item.subtotal
                }
            });

            await stockService.decreaseStock(tx, {
                productId: item.productId,
                quantity: item.quantity,
                reason: "SALE",
                referenceType: "SALE",
                referenceId: sale.id,
                remarks: `Invoice ${sale.invoiceNo}`
            });
        }

        return tx.sale.findUnique({
            where: {
                id: sale.id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    });
}

async function voidSale(id) {
    const saleId = Number(id);

    const sale = await prisma.sale.findUnique({
        where: {
            id: saleId
        },
        include: {
            items: true
        }
    });

    if (!sale) {
        throw new AppError("Sale not found.", 404);
    }

    if (sale.status === "VOIDED") {
        throw new AppError("Sale is already voided.", 400);
    }

    return prisma.$transaction(async (tx) => {
        for (const item of sale.items) {
            await stockService.increaseStock(tx, {
                productId: item.productId,
                quantity: item.quantity,
                reason: "RETURN",
                referenceType: "SALE",
                referenceId: sale.id,
                remarks: `Voided invoice ${sale.invoiceNo}`
            });
        }

        await tx.sale.update({
            where: {
                id: saleId
            },
            data: {
                status: "VOIDED"
            }
        });

        return tx.sale.findUnique({
            where: {
                id: saleId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    });
}

module.exports = {
    getSales,
    getSaleById,
    createSale,
    voidSale
};
