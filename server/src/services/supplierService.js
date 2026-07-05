const prisma = require("../config/prisma");

async function createSupplier(data) {
    return await prisma.supplier.create({
        data,
    });
}

async function getSuppliers(search = "") {
    return await prisma.supplier.findMany({
        where: {
            isActive: true,
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    contactPerson: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        },
        orderBy: {
            name: "asc",
        },
    });
}

async function getSupplierById(id) {
    return await prisma.supplier.findUnique({
        where: {
            id,
        },
    });
}

async function updateSupplier(id, data) {
    return await prisma.supplier.update({
        where: {
            id,
        },
        data,
    });
}

async function archiveSupplier(id) {
    return await prisma.supplier.update({
        where: {
            id,
        },
        data: {
            isActive: false,
        },
    });
}

module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    archiveSupplier
}