const { z } = require("zod");

const createPurchaseSchema = z.object({

    supplierId: z.number().int().positive().optional(),

    purchasedAt: z.string().datetime().optional(),

    remarks: z.string().optional().or(z.literal("")),

    items: z.array(

        z.object({

            productId: z.number().int().positive(),
            quantity: z.number().int().positive(),
            unitCost: z.number().positive()

        })

    ).min(1)

});

module.exports = {
    createPurchaseSchema
}