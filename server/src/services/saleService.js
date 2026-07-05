const { custom } = require("zod");
const prisma = require("../config/prisma");
const { generateInvoiceNumber } = require("../utils/invoiceGenerator");

async function createSale(data) {

    const invoiceNo = await generateInvoiceNumber();

    const productIds = data.items.map(item => item.productId);

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    if (products.length !== productIds.length) {
        throw new Error("One or more products were not found.");
    }

    let totalAmount = 0;
    const saleItems = [];

    for (const item of data.items) {
        const product = products.find(
            p => p.id === item.productId
        );

        if (product.stockQuantity < item.quantity) {
            throw new Error(
                `${product.name} has insufficient stock.`
            )
        }

        const subtotal = Nubmer(product.sellingPrice) * item.quantity;
        totalAmount += subtotal;

        saleItems.push({
            productId: product.id,
            quantity: item.quantity,
            unitPrice: product.sellingPrice,
            subtotal
        });
    }

    return await prisma.$transaction(async (tx) => {

        const sale = await tx.sale.create({
            data: {
                invoiceNo,
                customerName: data.customerName,
                paymentMethod: data.paymentMethod,
                totalAmount,
                remarks: data.remarks
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

            await tx.product.update({
                where: {
                    id: item.productId
                },
                data: {
                    stockQuantity: {
                        decrement: item.quantity
                    }
                }
            });

            await tx.stockTransaction.create({
                data: {
                    productId: item.productId,
                    type: "OUT",
                    reason: "SALE",
                    quantity: item.quantity,
                    referenceType: "SALE",
                    referenceId: sale.id,
                    remarks: `Invoice ${sale.invoiceNo}`
                }
            });

            return sale;
        }

    });

}

module.exports = {
    createSale,
}