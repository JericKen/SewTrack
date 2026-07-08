const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
const validate = require("../middleware/validate"); 
const { inventoryQuerySchema } = require("../validators/inventoryValidator");
const { adjustInventorySchema } = require("../validators/inventoryValidator");

router.get(
    "/",
    validate(inventoryQuerySchema, "query"),
    inventoryController.getInventory
);

router.get(
    "/:productId/history",
    inventoryController.getStockHistory
);

router.post(
    "/adjust",
    validate(adjustInventorySchema),
    inventoryController.adjustInventory
);

router.get(
    "/summary",
    inventoryController.getInventorySummary
);

module.exports = router;