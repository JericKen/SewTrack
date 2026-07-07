async function generateInvoiceNumber(tx) {

    const latestSale = await tx.sale.findFirst({
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