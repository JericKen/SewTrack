const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

async function createCategory(data) {

    const category = await prisma.category.create({
        data: {
            code: data.code,
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
        orderBy:    {
            name: "asc"
        }
    });

    return categories;
}

async function getCategoryById(id) {
    const category = await prisma.category.findFirst({
        where: {
            id: Number(id),
            isActive: true
        }, 
        select: {
            id: true,
            code: true,
            name: true,
            description: true,
            isActive: true,
            createdAt: true,
            updatedAt: true
        }
    });

    if (!category) {
        throw new AppError("Category not found.", 404);
    }

    return category;
}

async function updateCategory(id, data) {

    const existingCategory = await prisma.category.findFirst({
        where: {
            id: Number(id),
            isActive: true
        }
    });

    if (!existingCategory) {
        throw new AppError("Category not found.", 404);
    }

    return prisma.category.update({
        where: {
            id: Number(id)
        },
        data: {
            code: data.code,
            name: data.name,
            description: data.description
        }
    });

}

async function deleteCategory(id) {
    
    const category = await prisma.category.findFirst({
        where: {
            id: Number(id),
            isActive: true
        }
    });

    if (!category) {
        throw new AppError("Category not found.", 404);
    }

    return prisma.category.update({
        where: {
            id: Number(id)
        },
        data: {
            isActive: false
        }
    });

}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory 
};