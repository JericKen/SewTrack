const reportService = require("../services/reportService");

const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const getSalesReport = asyncHandler(async (req, res) => {

    const report = await reportService.getSalesReport(req.query);

    return apiResponse.success(

        res,

        200,

        "Sales report retrieved successfully.",

        report

    );

});

const getExpenseReport = asyncHandler(async (req, res) => {

    const report = await reportService.getExpenseReport(req.query);

    return apiResponse.success(

        res,

        200,

        "Expense report retrieved successfully.",

        report

    );

});

const getInventoryReport = asyncHandler(async (req, res) => {

    const report = await reportService.getInventoryReport(req.query);

    return apiResponse.success(

        res,

        200,

        "Inventory report retrieved successfully.",

        report

    );

});

const getRepairReport = asyncHandler(async (req, res) => {

    const report = await reportService.getRepairReport(req.query);

    return apiResponse.success(

        res,

        200,

        "Repair report retrieved successfully.",

        report

    );

});

const getProfitReport = asyncHandler(async (req, res) => {

    const report = await reportService.getProfitReport(req.query);

    return apiResponse.success(

        res,

        200,

        "Profit report retrieved successfully.",

        report

    );

});

module.exports = {
    getSalesReport,
    getExpenseReport,
    getInventoryReport,
    getRepairReport,
    getProfitReport
};