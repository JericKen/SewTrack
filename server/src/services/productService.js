const prisma = require("../config/prisma");
const generateSku = require("../utils/skuGenerator");

async function createProduct(data) {

    const category = await prisma.category.findFirst({
        where: {
            id: data.categoryId,
            isActive: true
        }
    });

    if (!category) {
        return null;
    }

    const latestProduct = await prisma.product.findFirst({
        where: {
            categoryId: data.categoryId
        },
        orderBy: {
            id: "desc"
        }
    });

    let nextSequence = 1;

    if (latestProduct) {

        const currentSequence = parseInt(
            latestProduct.sku.split("-")[1]
        );

        nextSequence = currentSequence + 1;

    }

    const sku = generateSku(category.code, nextSequence);

    return prisma.product.create({
        data: {
            categoryId: data.categoryId,
            type: data.type,
            name: data.name,
            description: data.description,
            sku,
            barcode: data.barcode,
            costPrice: data.costPrice,
            sellingPrice: data.sellingPrice,
            minimumStock: data.minimumStock,
            unit: data.unit
        },
        include: {
            category: true
        }
    });

}

module.exports = {
    createProduct
};