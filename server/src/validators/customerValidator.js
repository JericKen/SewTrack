const { z } = require("zod");

const createCustomerSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(2)
        .max(100),

    lastName: z
        .string()
        .trim()
        .max(100)
        .optional(),

    phone: z
        .string()
        .trim()
        .max(20)
        .optional(),

    address: z
        .string()
        .trim()
        .max(255)
        .optional(),

    remarks: z
        .string()
        .trim()
        .max(255)
        .optional()

});

const getCustomersSchema = z.object({

    search: z.string().trim().optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(10),

    sort: z.enum([
        "asc",
        "desc"
    ]).default("desc")

});

const customerIdSchema = z.object({

    id: z.coerce.number().int().positive()

});

const updateCustomerSchema = z.object({

    firstName: z
        .string()
        .trim()
        .min(2)
        .max(100)
        .optional(),

    lastName: z
        .string()
        .trim()
        .max(100)
        .optional(),

    phone: z
        .string()
        .trim()
        .max(20)
        .optional(),

    address: z
        .string()
        .trim()
        .max(255)
        .optional(),

    remarks: z
        .string()
        .trim()
        .max(255)
        .optional()

}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field must be provided."
});

module.exports = {
    createCustomerSchema,
    getCustomersSchema,
    customerIdSchema,
    updateCustomerSchema
};