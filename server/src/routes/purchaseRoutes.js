const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");
const validate = require("../middleware/validate");
const { createPurchaseSchema } = require("../validators/purchaseValidator");

router.get(
    "/", 
    purchaseController.getPurchases
);

router.post(
    "/",
    validate(createPurchaseSchema),
    purchaseController.createPurchase
);

module.exports = router;