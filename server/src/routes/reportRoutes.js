const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");

const validate = require("../middleware/validate");

const {
    salesReportSchema,
    expenseReportSchema,
    inventoryReportSchema,
    repairReportSchema
} = require("../validators/reportValidator");

router.get(
    "/sales",
    validate(salesReportSchema, "query"),
    reportController.getSalesReport
);

router.get(
    "/expenses",
    validate(expenseReportSchema, "query"),
    reportController.getExpenseReport

);

router.get(
    "/inventory",
    validate(inventoryReportSchema, "query"),
    reportController.getInventoryReport
);

router.get(
    "/repairs",
    validate(repairReportSchema, "query"),
    reportController.getRepairReport
);

router.get(
    "/profit",
    validate(salesReportSchema, "query"),
    reportController.getProfitReport
);

module.exports = router;