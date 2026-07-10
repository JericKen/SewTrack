function mapSaleReport(sale) {

    return {

        id: sale.id,

        invoiceNo: sale.invoiceNo,

        customerName: sale.customerName,

        paymentMethod: sale.paymentMethod,

        totalAmount: sale.totalAmount,

        remarks: sale.remarks,

        createdAt: sale.createdAt,

        items: sale.items.map(item => ({

            product: item.product.name,

            sku: item.product.sku,

            quantity: item.quantity,

            unitPrice: item.unitPrice,

            subtotal: item.subtotal

        }))

    };

}

module.exports = {
    mapSaleReport
};