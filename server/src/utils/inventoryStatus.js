const InventoryStatus = {
    IN_STOCK: "IN_STOCK",
    LOW_STOCK: "LOW_STOCK",
    OUT_OF_STOCK: "OUT_OF_STOCK"
};

function getInventoryStatus(product) {

    if (product.stockQuantity === 0) {
        return InventoryStatus.OUT_OF_STOCK;
    }

    if (product.stockQuantity <= product.minimumStock) {
        return InventoryStatus.LOW_STOCK;
    }

    return InventoryStatus.IN_STOCK;
}

module.exports = {
    InventoryStatus,
    getInventoryStatus
};