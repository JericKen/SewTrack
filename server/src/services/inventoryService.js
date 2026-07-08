const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const stockService = require("./stockService");

const { getInventoryStatus } = require("../utils/inventoryStatus");
const { getPagination } = require("../utils/pagination");
const { getSort } = require("../utils/sort");

async function getInventory(query) {

    const pagination = getPagination(query);
    const sort = getSort(query, "name");

    const where = {
        isActive: true
    };

    if (query.search) {

        where.OR = [
            {
                name: {
                    contains: query.search,
                    mode: "insensitive"
                }
            },
            {
                sku: {
                    contains: query.search,
                    mode: "insensitive"
                }
            }
        ];

    }

    if (query.category) {
        where.categoryId = Number(query.category);
    }

    const total = await prisma.product.count({
        where
    });

    const products = await prisma.product.findMany({

        where,

        include: {
            category: true
        },

        orderBy: sort,

        skip: pagination.skip,

        take: pagination.limit

    });

    const inventory = products.map(product => ({

        id: product.id,

        name: product.name,

        sku: product.sku,

        category: product.category.name,

        sellingPrice: product.sellingPrice,

        stockQuantity: product.stockQuantity,

        minimumStock: product.minimumStock,

        unit: product.unit,

        status: getInventoryStatus(product)

    }));

    const filteredInventory = query.status
        ? inventory.filter(product => product.status === query.status)
        : inventory;

    return {

        data: filteredInventory,

        pagination: {
            total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(total / pagination.limit)
        }

    };

}

async function getStockHistory(productId) {

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    const history = await prisma.stockTransaction.findMany({

        where: {
            productId
        },

        orderBy: {
            createdAt: "desc"
        }

    });

    return history;

}

async function adjustInventory(data) {

    return prisma.$transaction(async (tx) => {

        if (data.type === "IN") {

            await stockService.increaseStock(tx, {
                productId: data.productId,
                quantity: data.quantity,
                reason: data.reason,
                remarks: data.remarks,
                referenceType: "ADJUSTMENT"
            });

        } else {

            await stockService.decreaseStock(tx, {
                productId: data.productId,
                quantity: data.quantity,
                reason: data.reason,
                remarks: data.remarks,
                referenceType: "ADJUSTMENT"
            });

        }

        return tx.product.findUnique({

            where: {
                id: data.productId
            },

            include: {
                category: true
            }

        });

    });

}

async function getInventorySummary() {

    const products = await prisma.product.findMany({

        where: {
            isActive: true
        },

        select: {
            stockQuantity: true,
            minimumStock: true,
            costPrice: true
        }

    });

    let totalStock = 0;
    let lowStock = 0;
    let outOfStock = 0;
    let inventoryValue = 0;

    for (const product of products) {

        totalStock += product.stockQuantity;

        inventoryValue +=
            Number(product.costPrice) * product.stockQuantity;

        if (product.stockQuantity === 0) {

            outOfStock++;

        } else if (product.stockQuantity <= product.minimumStock) {

            lowStock++;

        }

    }

    return {

        totalProducts: products.length,

        totalStock,

        lowStock,

        outOfStock,

        inventoryValue

    };

}

module.exports = {
    getInventory,
    getStockHistory,
    adjustInventory,
    getInventorySummary
};