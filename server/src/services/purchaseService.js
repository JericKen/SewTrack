const prisma = require("../config/prisma");

async function createPurchase(data) {
    const totalAmount = data.items.reduce((total, item) => {
        return total + item.quantity * item.unitCost;
    }, 0);

    return prisma.$transaction(async (tx) => {

        const purchase = await tx.purchase.create({
            data: {
                supplierId: data.supplierId,
                purchasedAt: data.purchasedAt
                    ? new Date(data.purchasedAt)
                    : new Date(),
                totalAmount,
                remarks: data.remarks
            }
        });

        for (const item of data.items) {

            await tx.purchaseItem.create({
                data: {
                    purchaseId: purchase.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    unitCost: item.unitCost
                }
            });

            await tx.product.update({
                where: {
                    id: item.productId
                },
                data: {
                    stockQuantity: {
                        increment: item.quantity
                    }
                }
            });

            await tx.stockTransaction.create({
                data: {
                    productId: item.productId,
                    type: "IN",
                    reason: "PURCHASE",
                    referenceType: "PURCHASE",
                    referenceId: purchase.id,
                    quantity: item.quantity,
                    remarks: "Purchase"
                }
            })

        }

        return purchase;
    });
}

module.exports = {
    createPurchase
}