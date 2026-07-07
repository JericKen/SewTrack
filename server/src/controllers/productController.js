const productService = require("../services/productService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createProduct = asyncHandler(async (req, res) => {

    const product = await productService.createProduct(req.body);

    return apiResponse.success(
        res,
        201,
        "Product created successfully.",
        product
    );

});

module.exports = {
    createProduct
};