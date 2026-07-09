const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");

const validate = require("../middleware/validate");

const {
    createExpenseSchema,
    getExpensesSchema,
    expenseIdSchema,
    updateExpenseSchema
} = require("../validators/expenseValidator");

router.post(
    "/",
    validate(createExpenseSchema),
    expenseController.createExpense
);

router.get(
    "/summary",
    expenseController.getExpenseSummary
);

router.get(
    "/",
    validate(getExpensesSchema, "query"),
    expenseController.getExpenses
);

router.get(
    "/:id",
    validate(expenseIdSchema, "params"),
    expenseController.getExpenseById
);

router.patch(
    "/:id",
    validate(expenseIdSchema, "params"),
    validate(updateExpenseSchema),
    expenseController.updateExpense
);

router.delete(
    "/:id",
    validate(expenseIdSchema, "params"),
    expenseController.archiveExpense
);

module.exports = router;