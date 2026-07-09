const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const { getPagination } = require("../utils/pagination");
const { getSort } = require("../utils/sort");

async function createCustomer(data) {

    const customer = await prisma.customer.create({

        data

    });

    return customer;

}

async function getCustomers(query) {

    const where = {
        isActive: true
    };

    if (query.search) {

        where.OR = [

            {
                firstName: {
                    contains: query.search,
                    mode: "insensitive"
                }
            },

            {
                lastName: {
                    contains: query.search,
                    mode: "insensitive"
                }
            },

            {
                phone: {
                    contains: query.search,
                    mode: "insensitive"
                }
            }

        ];

    }

    const pagination = getPagination(query);
    const sort = getSort(query, "createdAt");

    const total = await prisma.customer.count({
        where
    });

    const customers = await prisma.customer.findMany({

        where,

        orderBy: sort,

        skip: pagination.skip,

        take: pagination.limit

    });

    const customerList = customers.map(customer => ({

        id: customer.id,

        firstName: customer.firstName,

        lastName: customer.lastName,

        phone: customer.phone,

        address: customer.address,

        remarks: customer.remarks,

        createdAt: customer.createdAt

    }));

    return {

        data: customerList,

        pagination: {

            total,

            page: pagination.page,

            limit: pagination.limit,

            totalPages: Math.ceil(total / pagination.limit)

        }

    };

}

async function getCustomerById(id) {

    const customer = await prisma.customer.findFirst({

        where: {

            id,

            isActive: true

        }

    });

    if (!customer) {

        throw new AppError("Customer not found.", 404);

    }

    return customer;

}

async function updateCustomer(id, data) {

    const customer = await prisma.customer.findFirst({

        where: {

            id,

            isActive: true

        }

    });

    if (!customer) {

        throw new AppError("Customer not found.", 404);

    }

    return prisma.customer.update({

        where: {

            id

        },

        data

    });

}

async function archiveCustomer(id) {

    const customer = await prisma.customer.findFirst({

        where: {
            id,
            isActive: true
        }

    });

    if (!customer) {
        throw new AppError("Customer not found.", 404);
    }

    return prisma.customer.update({

        where: {
            id
        },

        data: {
            isActive: false
        }

    });

}

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    archiveCustomer
};