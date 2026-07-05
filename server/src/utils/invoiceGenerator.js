const prisma = require("../config/prisma");

async function generateInvoiceNumber() {

    const latestSale = await prisma.sale.findFirst({
        orderBy: {
            id: "desc"
        }
    });

    const nextNumber = latestSale ? latestSale.id + 1 : 1;

    return `INV-${String(nextNumber).padStart(6, "0")}`;

}

module.exports = {
    generateInvoiceNumber
};