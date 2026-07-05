const supplierService = require("../services/supplierService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createSupplier = asyncHandler(async (req, res) => {
    const supplier = await supplierService.createSupplier(req.body);

    return apiResponse.success(
        res,
        201,
        "Supplier created successfully.",
        supplier
    );
});

const getSuppliers = asyncHandler(async (req, res) => {
    const suppliers = await supplierService.getSuppliers();

    return apiResponse.success(
        res,
        200,
        "Suppliers retrieved successfully.",
        suppliers
    );
});

module.exports = {
    createSupplier,
    getSuppliers,
};
