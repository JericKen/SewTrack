const inventoryService = require("../services/inventoryService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const getInventory = asyncHandler(async (req, res) => {

    const inventory = await inventoryService.getInventory(req.query);

    return apiResponse.success(
        res,
        200,
        "Inventory retrieved successfully.",
        inventory
    );

});

const getStockHistory = asyncHandler(async (req, res) => {

    const history = await inventoryService.getStockHistory(
        Number(req.params.productId)
    );

    return apiResponse.success(
        res,
        200,
        "Stock history retrieved successfully.",
        history
    );

});

const adjustInventory = asyncHandler(async (req, res) => {

    const adjustment = await inventoryService.adjustInventory(req.body);

    return apiResponse.success(
        res,
        200,
        "Inventory adjusted successfully.",
        adjustment
    );

});

const getInventorySummary = asyncHandler(async (req, res) => {

    const summary =
        await inventoryService.getInventorySummary();

    return apiResponse.success(
        res,
        200,
        "Inventory summary retrieved successfully.",
        summary
    );

});

module.exports = {
    getInventory,
    getStockHistory,
    adjustInventory,
    getInventorySummary
};   