const prisma = require("../config/prisma");

async function createCategory(data) {

    const category = await prisma.category.create({
        data: {
            name: data.name,
            description: data.description
        }
    });

    return category;
}

async function getCategories() {
    const categories = await prisma.category.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            name: "asc"
        }
    });

    return categories;
}

module.exports = {
    createCategory,
    getCategories
};