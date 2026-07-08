const { z } = require("zod");

const inventoryQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    search: z.string().trim().optional(),

    category: z.coerce.number().int().positive().optional(),

    status: z.enum([
        "IN_STOCK",
        "LOW_STOCK",
        "OUT_OF_STOCK"
    ]).optional(),

    sortBy: z.enum([
        "name",
        "stockQuantity",
        "sellingPrice",
        "createdAt"
    ]).default("name"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("asc")
});

const adjustInventorySchema = z.object({

    productId: z.coerce.number().int().positive(),

    quantity: z.coerce.number().int().positive(),

    type: z.enum([
        "IN",
        "OUT"
    ]),

    reason: z.enum([
        "DAMAGED",
        "PERSONAL_USE",
        "ADJUSTMENT",
        "RETURN"
    ]),

    remarks: z.string().trim().max(255).optional()

});

module.exports = {
    inventoryQuerySchema,
    adjustInventorySchema
};