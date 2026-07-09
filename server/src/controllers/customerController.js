const customerService = require("../services/customerService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createCustomer = asyncHandler(async (req, res) => {

    const customer = await customerService.createCustomer(req.body);

    return apiResponse.success(
        res,
        201,
        "Customer created successfully.",
        customer
    );

});

const getCustomers = asyncHandler(async (req, res) => {

    const customers = await customerService.getCustomers(req.query);

    return apiResponse.success(
        res,
        200,
        "Customers retrieved successfully.",
        customers
    );

});

const getCustomerById = asyncHandler(async (req, res) => {

    const customer = await customerService.getCustomerById(

        req.params.id

    );

    return apiResponse.success(

        res,

        200,

        "Customer retrieved successfully.",

        customer

    );

});

const updateCustomer = asyncHandler(async (req, res) => {

    const customer = await customerService.updateCustomer(

        Number(req.params.id),

        req.body

    );

    return apiResponse.success(

        res,

        200,

        "Customer updated successfully.",

        customer

    );

});

const archiveCustomer = asyncHandler(async (req, res) => {

    await customerService.archiveCustomer(
        Number(req.params.id)
    );

    return apiResponse.success(
        res,
        200,
        "Customer archived successfully."
    );

});

module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    archiveCustomer
};