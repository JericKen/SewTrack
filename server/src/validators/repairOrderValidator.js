const { z } = require("zod");

const createRepairOrderSchema = z.object({

    customerId: z.coerce.number().int().positive().optional(),

    customerName: z.string()
        .trim()
        .min(2)
        .max(100),

    phone: z.string()
        .trim()
        .max(20)
        .optional(),

    itemType: z.string()
        .trim()
        .min(2)
        .max(100),

    description: z.string()
        .trim()
        .min(5)
        .max(500),

    repairCost: z.coerce.number()
        .nonnegative(),

    dueDate: z.coerce.date().optional(),

    remarks: z.string()
        .trim()
        .max(255)
        .optional()

});

const getRepairOrdersSchema = z.object({

    search: z.string().trim().optional(),

    status: z.enum([
        "PENDING",
        "IN_PROGRESS",
        "READY_FOR_PICKUP",
        "COMPLETED",
        "CANCELLED"
    ]).optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    sort: z.enum(["asc", "desc"]).default("desc")

});

const repairOrderIdSchema = z.object({

    id: z.coerce.number().int().positive()

});

const updateRepairStatusSchema = z.object({
    status: z.enum([
        "IN_PROGRESS",
        "READY_FOR_PICKUP",
        "COMPLETED",
        "CANCELLED"
    ])
});

const updateRepairOrderSchema = z.object({

    customerId: z.coerce.number().int().positive().optional(),

    customerName: z.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    phone: z.string()
        .trim()
        .max(20)
        .optional(),

    itemType: z.string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    description: z.string()
        .trim()
        .min(5)
        .max(500)
        .optional(),

    repairCost: z.coerce.number()
        .nonnegative()
        .optional(),

    dueDate: z.coerce.date().optional(),

    remarks: z.string()
        .trim()
        .max(255)
        .optional()

}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided."
});

module.exports = {
    createRepairOrderSchema,
    getRepairOrdersSchema,
    repairOrderIdSchema,
    updateRepairStatusSchema,
    updateRepairOrderSchema
};