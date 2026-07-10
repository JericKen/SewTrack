const dashboardService = require("../services/dashboardService");

const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const getDashboardSummary = asyncHandler(async (req, res) => {

    const dashboard = await dashboardService.getDashboardSummary();

    return apiResponse.success(
        res,
        200,
        "Dashboard retrieved successfully.",
        dashboard
    );

});

module.exports = {
    getDashboardSummary
};