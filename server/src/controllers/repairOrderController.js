const repairOrderService = require("../services/repairOrderService");

const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createRepairOrder = asyncHandler(async (req, res) => {

    const repairOrder = await repairOrderService.createRepairOrder(req.body);

    return apiResponse.success(

        res,

        201,

        "Repair order created successfully.",

        repairOrder

    );

});

const getRepairOrders = asyncHandler(async (req, res) => {

    const repairOrders = await repairOrderService.getRepairOrders(req.query);

    return apiResponse.success(
        res,
        200,
        "Repair orders retrieved successfully.",
        repairOrders
    );

});

const getRepairOrderById = asyncHandler(async (req, res) => {

    const repairOrder = await repairOrderService.getRepairOrderById(

        Number(req.params.id)

    );

    return apiResponse.success(

        res,

        200,

        "Repair order retrieved successfully.",

        repairOrder

    );

});

const updateRepairStatus = asyncHandler(async (req, res) => {

    const repairOrder = await repairOrderService.updateRepairStatus(

        Number(req.params.id),

        req.body.status

    );

    return apiResponse.success(

        res,

        200,

        "Repair status updated successfully.",

        repairOrder

    );

});

const updateRepairOrder = asyncHandler(async (req, res) => {

    const repairOrder = await repairOrderService.updateRepairOrder(

        Number(req.params.id),

        req.body

    );

    return apiResponse.success(

        res,

        200,

        "Repair order updated successfully.",

        repairOrder

    );

});

const cancelRepairOrder = asyncHandler(async (req, res) => {

    const repairOrder = await repairOrderService.cancelRepairOrder(

        Number(req.params.id)

    );

    return apiResponse.success(

        res,

        200,

        "Repair order cancelled successfully.",

        repairOrder

    );

});

module.exports = {
    createRepairOrder,
    getRepairOrders,
    getRepairOrderById,
    updateRepairStatus,
    updateRepairOrder,
    cancelRepairOrder
};