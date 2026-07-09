const express = require("express");

const router = express.Router();

const repairOrderController = require("../controllers/repairOrderController");

const validate = require("../middleware/validate");

const {
    createRepairOrderSchema,
    getRepairOrdersSchema,
    repairOrderIdSchema,
    updateRepairStatusSchema,
    updateRepairOrderSchema
} = require("../validators/repairOrderValidator");

router.post(
    "/",
    validate(createRepairOrderSchema),
    repairOrderController.createRepairOrder
);

router.get(
    "/",
    validate(getRepairOrdersSchema, "query"),
    repairOrderController.getRepairOrders
);

router.get(
    "/:id",
    validate(repairOrderIdSchema, "params"),
    repairOrderController.getRepairOrderById
);

router.patch(
    "/:id/status",
    validate(repairOrderIdSchema, "params"),
    validate(updateRepairStatusSchema),
    repairOrderController.updateRepairStatus
);

router.patch(
    "/:id",
    validate(repairOrderIdSchema, "params"),
    validate(updateRepairOrderSchema),
    repairOrderController.updateRepairOrder
);

router.patch(
    "/:id/cancel",
    validate(repairOrderIdSchema, "params"),
    repairOrderController.cancelRepairOrder
);


module.exports = router;