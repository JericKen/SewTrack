const purchaseService = require("../services/purchaseService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createPurchase = asyncHandler(async (req, res) => {

    const purchase = await purchaseService.createPurchase(req.body);

    return apiResponse.success(
        res,
        201,
        "Purchase created successfully.",
        purchase
    );

});

module.exports = {
    createPurchase
}