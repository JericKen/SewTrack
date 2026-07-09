const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

const { getPagination } = require("../utils/pagination");
const { getSort } = require("../utils/sort");

async function createRepairOrder(data) {

    let customerName = data.customerName;
    let phone = data.phone;

    if (data.customerId) {

        const customer = await prisma.customer.findFirst({

            where: {
                id: data.customerId,
                isActive: true
            }

        });

        if (!customer) {
            throw new AppError("Customer not found.", 404);
        }

        customerName = `${customer.firstName}${
            customer.lastName ? ` ${customer.lastName}` : ""
        }`;

        phone = customer.phone;

    }

    return prisma.repairOrder.create({

        data: {

            customerId: data.customerId,

            customerName,

            phone,

            itemType: data.itemType,

            description: data.description,

            repairCost: data.repairCost,

            dueDate: data.dueDate,

            remarks: data.remarks

        }

    });

}

async function getRepairOrders(query) {

    const where = {};

    if (query.search) {

        where.OR = [

            {
                customerName: {
                    contains: query.search,
                    mode: "insensitive"
                }
            },

            {
                itemType: {
                    contains: query.search,
                    mode: "insensitive"
                }
            }

        ];

    }

    if (query.status) {

        where.status = query.status;

    }

    const pagination = getPagination(query);

    const sort = getSort(query, "receivedAt");

    const total = await prisma.repairOrder.count({

        where

    });

    const repairOrders = await prisma.repairOrder.findMany({

        where,

        orderBy: sort,

        skip: pagination.skip,

        take: pagination.limit,

        include: {

            customer: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true

                }

            }

        }

    });

    const result = repairOrders.map(repair => ({

        id: repair.id,

        customerName: repair.customerName,

        phone: repair.phone,

        itemType: repair.itemType,

        description: repair.description,

        repairCost: repair.repairCost,

        status: repair.status,

        receivedAt: repair.receivedAt,

        dueDate: repair.dueDate

    }));

    return {

        data: result,

        pagination: {

            total,

            page: pagination.page,

            limit: pagination.limit,

            totalPages: Math.ceil(total / pagination.limit)

        }

    };

}

async function getRepairOrderById(id) {

    const repairOrder = await prisma.repairOrder.findUnique({

        where: {
            id
        },

        include: {

            customer: {

                select: {

                    id: true,

                    firstName: true,

                    lastName: true,

                    phone: true,

                    address: true

                }

            }

        }

    });

    if (!repairOrder) {

        throw new AppError("Repair order not found.", 404);

    }

    return {

        id: repairOrder.id,

        customerId: repairOrder.customerId,

        customerName: repairOrder.customerName,

        phone: repairOrder.phone,

        itemType: repairOrder.itemType,

        description: repairOrder.description,

        repairCost: repairOrder.repairCost,

        status: repairOrder.status,

        receivedAt: repairOrder.receivedAt,

        dueDate: repairOrder.dueDate,

        completedAt: repairOrder.completedAt,

        claimedAt: repairOrder.claimedAt,

        remarks: repairOrder.remarks,

        customer: repairOrder.customer

    };

}

async function updateRepairStatus(id, status) {

    const repair = await prisma.repairOrder.findUnique({
        where: {
            id
        }
    });

    if (!repair) {
        throw new AppError("Repair order not found.", 404);
    }

    const data = {
        status
    };

    if (status === "COMPLETED") {

        if (!repair.completedAt) {
            data.completedAt = new Date();
        }

    } else {

        data.completedAt = null;

    }

    return prisma.repairOrder.update({
        where: {
            id
        },
        data
    });

}

async function updateRepairOrder(id, data) {

    const repairOrder = await prisma.repairOrder.findUnique({

        where: {
            id
        }

    });

    if (!repairOrder) {

        throw new AppError("Repair order not found.", 404);

    }

    if (data.customerId) {

        const customer = await prisma.customer.findFirst({

            where: {

                id: data.customerId,

                isActive: true

            }

        });

        if (!customer) {

            throw new AppError("Customer not found.", 404);

        }

        data.customerName = `${customer.firstName}${
            customer.lastName ? ` ${customer.lastName}` : ""
        }`;

        data.phone = customer.phone;

    }

    return prisma.repairOrder.update({

        where: {
            id
        },

        data

    });

}

async function cancelRepairOrder(id) {

    const repairOrder = await prisma.repairOrder.findUnique({

        where: {
            id
        }

    });

    if (!repairOrder) {

        throw new AppError("Repair order not found.", 404);

    }

    if (repairOrder.status === "COMPLETED") {

        throw new AppError(
            "Completed repair orders cannot be cancelled.",
            400
        );

    }

    if (repairOrder.status === "CANCELLED") {

        throw new AppError(
            "Repair order is already cancelled.",
            400
        );

    }

    return prisma.repairOrder.update({

        where: {
            id
        },

        data: {

            status: "CANCELLED"

        }

    });

}

module.exports = {
    createRepairOrder,
    getRepairOrders,
    getRepairOrderById,
    updateRepairStatus,
    updateRepairOrder,
    cancelRepairOrder
};