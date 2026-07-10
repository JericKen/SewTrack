const prisma = require("../config/prisma");

async function getDashboardSummary() {

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    // ===========================
    // Sales
    // ===========================

    const [
        totalSales,
        todaySales,
        monthSales
    ] = await Promise.all([

        prisma.sale.aggregate({
            _sum: {
                totalAmount: true
            }
        }),

        prisma.sale.aggregate({
            where: {
                createdAt: {
                    gte: startOfToday
                }
            },
            _sum: {
                totalAmount: true
            }
        }),

        prisma.sale.aggregate({
            where: {
                createdAt: {
                    gte: startOfMonth
                }
            },
            _sum: {
                totalAmount: true
            }
        })

    ]);

    // ===========================
    // Expenses
    // ===========================

    const [
        totalExpenses,
        todayExpenses,
        monthExpenses
    ] = await Promise.all([

        prisma.expense.aggregate({
            where: {
                isActive: true
            },
            _sum: {
                amount: true
            }
        }),

        prisma.expense.aggregate({
            where: {
                isActive: true,
                expenseDate: {
                    gte: startOfToday
                }
            },
            _sum: {
                amount: true
            }
        }),

        prisma.expense.aggregate({
            where: {
                isActive: true,
                expenseDate: {
                    gte: startOfMonth
                }
            },
            _sum: {
                amount: true
            }
        })

    ]);

    // ===========================
    // Inventory
    // ===========================

    const products = await prisma.product.findMany({

        where: {
            isActive: true
        },

        select: {

            stockQuantity: true,

            minimumStock: true

        }

    });

    const inventorySummary = {

        totalProducts: products.length,

        lowStock: products.filter(
            product => product.stockQuantity <= product.minimumStock
        ).length,

        outOfStock: products.filter(
            product => product.stockQuantity === 0
        ).length

    };

    // ===========================
    // Repairs
    // ===========================

    const [
        pending,
        inProgress,
        readyForPickup,
        completedToday
    ] = await Promise.all([

        prisma.repairOrder.count({
            where: {
                status: "PENDING"
            }
        }),

        prisma.repairOrder.count({
            where: {
                status: "IN_PROGRESS"
            }
        }),

        prisma.repairOrder.count({
            where: {
                status: "READY_FOR_PICKUP"
            }
        }),

        prisma.repairOrder.count({
            where: {
                status: "COMPLETED",
                completedAt: {
                    gte: startOfToday
                }
            }
        })

    ]);

    // ===========================
    // Customers
    // ===========================

    const totalCustomers = await prisma.customer.count({

        where: {
            isActive: true
        }

    });

    // ===========================
    // Response
    // ===========================

    return {

        sales: {

            total: totalSales._sum.totalAmount ?? 0,

            today: todaySales._sum.totalAmount ?? 0,

            month: monthSales._sum.totalAmount ?? 0

        },

        expenses: {

            total: totalExpenses._sum.amount ?? 0,

            today: todayExpenses._sum.amount ?? 0,

            month: monthExpenses._sum.amount ?? 0

        },

        inventory: inventorySummary,

        repairs: {

            pending,

            inProgress,

            readyForPickup,

            completedToday

        },

        customers: {

            total: totalCustomers

        },

        profit: {

            month:
                (monthSales._sum.totalAmount ?? 0) -
                (monthExpenses._sum.amount ?? 0)

        }

    };

}

module.exports = {
    getDashboardSummary
};