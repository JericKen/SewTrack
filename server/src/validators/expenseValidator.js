const { z } = require("zod");

const createExpenseSchema = z.object({

    category: z.enum([
        "BUSINESS",
        "HOUSEHOLD",
        "CAPITAL",
        "UTILITIES",
        "TRANSPORTATION",
        "MAINTENANCE",
        "OTHER"
    ]),

    amount: z.coerce
        .number()
        .positive(),

    paymentMethod: z.enum([
        "CASH",
        "GCASH",
        "BANK_TRANSFER"
    ]),

    description: z.string()
        .trim()
        .min(2)
        .max(255),

    expenseDate: z.coerce.date(),

    remarks: z.string()
        .trim()
        .max(255)
        .optional()

});

const getExpensesSchema = z.object({

    search: z.string()
        .trim()
        .optional(),

    category: z.enum([
        "BUSINESS",
        "HOUSEHOLD",
        "CAPITAL",
        "UTILITIES",
        "TRANSPORTATION",
        "MAINTENANCE",
        "OTHER"
    ]).optional(),

    paymentMethod: z.enum([
        "CASH",
        "GCASH",
        "BANK_TRANSFER"
    ]).optional(),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    sort: z.enum(["asc", "desc"]).default("desc")

});

const expenseIdSchema = z.object({

    id: z.coerce.number().int().positive()

});

const updateExpenseSchema = z.object({

    category: z.enum([
        "BUSINESS",
        "HOUSEHOLD",
        "CAPITAL",
        "UTILITIES",
        "TRANSPORTATION",
        "MAINTENANCE",
        "OTHER"
    ]).optional(),

    amount: z.coerce
        .number()
        .positive()
        .optional(),

    paymentMethod: z.enum([
        "CASH",
        "GCASH",
        "BANK_TRANSFER"
    ]).optional(),

    description: z.string()
        .trim()
        .min(2)
        .max(255)
        .optional(),

    expenseDate: z.coerce
        .date()
        .optional(),

    remarks: z.string()
        .trim()
        .max(255)
        .optional()

}).refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field must be provided."
    }
);

module.exports = {
    createExpenseSchema,
    getExpensesSchema,
    expenseIdSchema,
    updateExpenseSchema
};