const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

async function increaseStock(tx, data) {
    
    const updatedProduct = await tx.product.update({

        where: {
            id: data.productId
        },

        data: {
            stockQuantity: {
                increment: data.quantity
            }
        }

    });

    await createStockTransaction(tx, {
        productId: data.productId,
        type: "IN",
        reason: data.reason,
        quantity: data.quantity,
        balanceAfter: updatedProduct.stockQuantity,
        referenceType: data.referenceType,
        referenceId: data.referenceId,
        remarks: data.remarks
    });
}

async function decreaseStock(tx, data) {
    
    const product = await tx.product.findUnique({
        where: {
            id: data.productId
        }
    });

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    if (product.stockQuantity < data.quantity) {
        throw new AppError(`${product.name} has insufficient stock.`, 400);
    }

    const updatedProduct = await tx.product.update({
        where: {
            id: data.productId
        },
        data: {
            stockQuantity: {
                decrement: data.quantity
            }
        }
    });

    await createStockTransaction(tx, {
        productId: data.productId,
        type: "OUT",
        reason: data.reason,
        quantity: data.quantity,
        balanceAfter: updatedProduct.stockQuantity,
        referenceType: data.referenceType,
        referenceId: data.referenceId,
        remarks: data.remarks
    });
}

async function adjustStock(tx, data) {

}

async function createStockTransaction(tx, data) {

    return tx.stockTransaction.create({

        data

    });

}

module.exports = {
    increaseStock,
    decreaseStock,
    adjustStock
};