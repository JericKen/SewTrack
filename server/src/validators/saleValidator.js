const { z } = require("zod");

const createSaleSchema = z.object({

    customerName: z.string().optional().or(z.literal("")),

    paymentMethod: z.enum([
        "CASH",
        "GCASH",
        "BANK_TRANSFER"
    ]),

    remarks: z.string().optional().or(z.literal("")),

    items: z.array(

        z.object({

            productId: z.number().int(),

            quantity: z.number().int().positive()

        })

    ).min(1)

});

module.exports = {
    createSaleSchema
};