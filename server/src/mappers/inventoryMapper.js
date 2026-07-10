function mapInventoryReport(product) {

    return {

        id: product.id,

        sku: product.sku,

        product: product.name,

        category: product.category.name,

        stockQuantity: product.stockQuantity,

        minimumStock: product.minimumStock,

        unit: product.unit

    };

}

module.exports = {
    mapInventoryReport
};