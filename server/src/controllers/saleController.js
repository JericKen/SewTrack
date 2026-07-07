const saleService = require("../services/saleService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const getSales = asyncHandler(async (req, res) => {
    const sales = await saleService.getSales(req.query);

    return apiResponse.success(
        res,
        200,
        "Sales retrieved successfully.",
        sales
    );
});

const getSaleById = asyncHandler(async (req, res) => {
    const sale = await saleService.getSaleById(req.params.id);

    return apiResponse.success(
        res,
        200,
        "Sale retrieved successfully.",
        sale
    );
});

const createSale = asyncHandler(async (req, res) => {
    const sale = await saleService.createSale(req.body);

    return apiResponse.success(
        res,
        201,
        "Sale created successfully.",
        sale
    );
});

const voidSale = asyncHandler(async (req, res) => {
    const sale = await saleService.voidSale(req.params.id);

    return apiResponse.success(
        res,
        200,
        "Sale voided successfully.",
        sale
    );
});

module.exports = {
    getSales,
    getSaleById,
    createSale,
    voidSale
};
