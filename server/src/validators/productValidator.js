const { z } = require("zod");

const createProductSchema = z.object({

    categoryId: z.coerce.number({
        required_error: "Category is required."
    }),

    type: z.enum([
        "RESALE",
        "MANUFACTURED",
        "MATERIAL"
    ], {
        required_error: "Product type is required."
    }),

    name: z.string()
        .trim()
        .min(1, "Product name is required.")
        .max(100),

    description: z.string().trim().optional(),

    barcode: z.string().trim().optional(),

    costPrice: z.number().positive(),

    sellingPrice: z.number().positive(),

    minimumStock: z.number().int().min(0),

    unit: z.enum([
        "PCS",
        "METER",
        "PACK",
        "PAIR",
        "ROLL"
    ])

});

module.exports = {
    createProductSchema
};