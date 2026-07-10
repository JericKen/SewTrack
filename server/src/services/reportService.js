const prisma = require("../config/prisma");

const { buildReportFilter } = require("../utils/reportFilter");
const { buildReportSummary } = require("../utils/reportSummary");

const { mapSaleReport } = require("../mappers/saleMapper");
const { mapExpenseReport } = require("../mappers/expenseMapper");

const { getInventoryStatus } = require("../utils/inventoryStatus");
const { mapInventoryReport } = require("../mappers/inventoryMapper");
const { mapRepairReport } = require("../mappers/repairMapper");

async function getSalesReport(query) {

    const where = buildReportFilter(query);

    const [
        aggregate,
        totalTransactions,
        sales
    ] = await Promise.all([

        prisma.sale.aggregate({

            where,

            _sum: {
                totalAmount: true
            },

            _avg: {
                totalAmount: true
            }

        }),

        prisma.sale.count({

            where

        }),

        prisma.sale.findMany({

            where,

            include: {

                items: {

                    include: {

                        product: {

                            select: {

                                name: true,

                                sku: true

                            }

                        }

                    }

                }

            },

            orderBy: {

                createdAt: "desc"

            }

        })

    ]);

    return {

        summary: buildReportSummary({

            aggregate,

            totalTransactions,

            field: "totalAmount",

            totalKey: "totalSales",

            averageKey: "averageSale"

        }),

        data: sales.map(mapSaleReport)

    };

}

async function getExpenseReport(query) {

    const where = {

        isActive: true,

        ...buildReportFilter(query, {

            dateField: "expenseDate",

            allowCategory: true,

            allowPaymentMethod: true

        })

    };

    const [
        aggregate,
        totalTransactions,
        expenses
    ] = await Promise.all([

        prisma.expense.aggregate({

            where,

            _sum: {

                amount: true

            },

            _avg: {

                amount: true

            }

        }),

        prisma.expense.count({

            where

        }),

        prisma.expense.findMany({

            where,

            orderBy: {

                expenseDate: "desc"

            }

        })

    ]);

    return {

        summary: buildReportSummary({

            aggregate,

            totalTransactions,

            field: "amount",

            totalKey: "totalExpenses",

            averageKey: "averageExpense"

        }),

        data: expenses.map(mapExpenseReport)

    };

}

async function getInventoryReport(query) {

    const where = {

        isActive: true

    };

    if (query.category) {

        where.categoryId = query.category;

    }

    const products = await prisma.product.findMany({

        where,

        include: {

            category: {

                select: {

                    name: true

                }

            }

        },

        orderBy: {

            name: "asc"

        }

    });

    const inventory = products.map(product => ({

        ...mapInventoryReport(product),

        status: getInventoryStatus(product)

    }));

    // Summary is based only on category filtering
    const summary = {

        totalProducts: inventory.length,

        inStock: inventory.filter(
            product => product.status === "IN_STOCK"
        ).length,

        lowStock: inventory.filter(
            product => product.status === "LOW_STOCK"
        ).length,

        outOfStock: inventory.filter(
            product => product.status === "OUT_OF_STOCK"
        ).length

    };

    // Status filter affects only the table
    const data = query.status
        ? inventory.filter(
            product => product.status === query.status
        )
        : inventory;

    return {

        summary,

        data

    };

}

async function getRepairReport(query) {

    const where = buildReportFilter(query, {

        dateField: "receivedAt"

    });

    if (query.customerId) {

        where.customerId = query.customerId;

    }

    if (query.status) {

        where.status = query.status;

    }

    const repairs = await prisma.repairOrder.findMany({

        where,

        include: {

            customer: {

                select: {

                    firstName: true,

                    lastName: true

                }

            }

        },

        orderBy: {

            receivedAt: "desc"

        }

    });

    const summary = {

        totalRepairs: repairs.length,

        pending: repairs.filter(
            repair => repair.status === "PENDING"
        ).length,

        inProgress: repairs.filter(
            repair => repair.status === "IN_PROGRESS"
        ).length,

        readyForPickup: repairs.filter(
            repair => repair.status === "READY_FOR_PICKUP"
        ).length,

        completed: repairs.filter(
            repair => repair.status === "COMPLETED"
        ).length,

        cancelled: repairs.filter(
            repair => repair.status === "CANCELLED"
        ).length

    };

    return {

        summary,

        data: repairs.map(mapRepairReport)

    };

}

async function getProfitReport(query) {

    const where = buildReportFilter(query);

    const [
        sales,
        expenses
    ] = await Promise.all([

        prisma.sale.aggregate({

            where,

            _sum: {
                totalAmount: true
            }

        }),

        prisma.expense.aggregate({

            where: {

                isActive: true,

                ...buildReportFilter(query, {

                    dateField: "expenseDate"

                })

            },

            _sum: {
                amount: true
            }

        })

    ]);

    const totalSales = sales._sum.totalAmount ?? 0;

    const totalExpenses = expenses._sum.amount ?? 0;

    return {

        summary: {

            sales: totalSales,

            expenses: totalExpenses,

            profit: totalSales - totalExpenses

        }

    };

}

module.exports = {
    getSalesReport,
    getExpenseReport,
    getInventoryReport,
    getRepairReport,
    getProfitReport
};