const { z } = require("zod");

const reportFilterSchema = z.object({

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional()

});

const salesReportSchema = reportFilterSchema;

const expenseReportSchema = reportFilterSchema.extend({

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
    ]).optional()

});

const inventoryReportSchema = z.object({

    category: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    status: z.enum([
        "IN_STOCK",
        "LOW_STOCK",
        "OUT_OF_STOCK"
    ]).optional()

});

const repairReportSchema = reportFilterSchema.extend({

    customerId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    status: z.enum([
        "PENDING",
        "IN_PROGRESS",
        "READY_FOR_PICKUP",
        "COMPLETED",
        "CANCELLED"
    ]).optional()

});


module.exports = {
    salesReportSchema,
    expenseReportSchema,
    inventoryReportSchema,
    repairReportSchema
};