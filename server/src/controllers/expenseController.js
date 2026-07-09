const expenseService = require("../services/expenseService");

const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createExpense = asyncHandler(async (req, res) => {

    const expense = await expenseService.createExpense(req.body);

    return apiResponse.success(

        res,

        201,

        "Expense created successfully.",

        expense

    );

});

const getExpenses = asyncHandler(async (req, res) => {

    const expenses = await expenseService.getExpenses(req.query);

    return apiResponse.success(

        res,

        200,

        "Expenses retrieved successfully.",

        expenses

    );

});

const getExpenseById = asyncHandler(async (req, res) => {

    const expense = await expenseService.getExpenseById(

        Number(req.params.id)

    );

    return apiResponse.success(

        res,

        200,

        "Expense retrieved successfully.",

        expense

    );

});

const updateExpense = asyncHandler(async (req, res) => {

    const expense = await expenseService.updateExpense(

        Number(req.params.id),

        req.body

    );

    return apiResponse.success(

        res,

        200,

        "Expense updated successfully.",

        expense

    );

});

const archiveExpense = asyncHandler(async (req, res) => {

    await expenseService.archiveExpense(

        Number(req.params.id)

    );

    return apiResponse.success(

        res,

        200,

        "Expense archived successfully."

    );

});

const getExpenseSummary = asyncHandler(async (req, res) => {

    const summary = await expenseService.getExpenseSummary();

    return apiResponse.success(

        res,

        200,

        "Expense summary retrieved successfully.",

        summary

    );

});

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    archiveExpense,
    getExpenseSummary
};