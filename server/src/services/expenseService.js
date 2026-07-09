const prisma = require("../config/prisma");
const AppError = require("../utils/appError");

const { getPagination } = require("../utils/pagination");
const { getSort } = require("../utils/sort");
const { buildDateRange } = require("../utils/dateRange");

async function createExpense(data) {

    return prisma.expense.create({
        data
    });

}

async function getExpenses(query) {

    const where = {
        isActive: true
    };

    if (query.search) {

        where.description = {
            contains: query.search,
            mode: "insensitive"
        };

    }

    if (query.category) {

        where.category = query.category;

    }

    if (query.paymentMethod) {

        where.paymentMethod = query.paymentMethod;

    }

    if (query.startDate || query.endDate) {

        where.expenseDate = buildDateRange(
            query.startDate,
            query.endDate
        );

    }

    const pagination = getPagination(query);
    const sort = getSort(query, "expenseDate");

    const total = await prisma.expense.count({
        where
    });

    const expenses = await prisma.expense.findMany({

        where,

        orderBy: sort,

        skip: pagination.skip,

        take: pagination.limit

    });

    return {

        data: expenses.map(mapExpense),

        pagination: {

            total,

            page: pagination.page,

            limit: pagination.limit,

            totalPages: Math.ceil(total / pagination.limit)

        }

    };

}

async function getExpenseById(id) {

    const expense = await findExpenseOrThrow(id);

    return mapExpense(expense);

}

async function updateExpense(id, data) {

    await findExpenseOrThrow(id);

    const updatedExpense = await prisma.expense.update({

        where: {
            id
        },

        data

    });

    return mapExpense(updatedExpense);

}

async function archiveExpense(id) {

    await findExpenseOrThrow(id);

    return prisma.expense.update({

        where: {
            id
        },

        data: {
            isActive: false
        }

    });

}

async function findExpenseOrThrow(id) {

    const expense = await prisma.expense.findFirst({

        where: {

            id,

            isActive: true

        }

    });

    if (!expense) {

        throw new AppError("Expense not found.", 404);

    }

    return expense;

}

function mapExpense(expense) {

    return {

        id: expense.id,

        category: expense.category,

        amount: expense.amount,

        paymentMethod: expense.paymentMethod,

        description: expense.description,

        expenseDate: expense.expenseDate,

        remarks: expense.remarks,

        createdAt: expense.createdAt,

        updatedAt: expense.updatedAt

    };

}

async function getExpenseSummary() {

    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    const startOfYear = new Date(
        now.getFullYear(),
        0,
        1
    );

    const where = {
        isActive: true
    };

    const [
        total,
        today,
        month,
        year,
        categorySummary
    ] = await Promise.all([

        prisma.expense.aggregate({

            where,

            _sum: {
                amount: true
            }

        }),

        prisma.expense.aggregate({

            where: {

                ...where,

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

                ...where,

                expenseDate: {
                    gte: startOfMonth
                }

            },

            _sum: {
                amount: true
            }

        }),

        prisma.expense.aggregate({

            where: {

                ...where,

                expenseDate: {
                    gte: startOfYear
                }

            },

            _sum: {
                amount: true
            }

        }),

        prisma.expense.groupBy({

            by: ["category"],

            where,

            _sum: {
                amount: true
            }

        })

    ]);

    return {

        totalExpenses: total._sum.amount ?? 0,

        todayExpenses: today._sum.amount ?? 0,

        monthExpenses: month._sum.amount ?? 0,

        yearExpenses: year._sum.amount ?? 0,

        expensesByCategory: categorySummary.map(item => ({

            category: item.category,

            amount: item._sum.amount ?? 0

        }))

    };

}

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    archiveExpense,
    getExpenseSummary
};