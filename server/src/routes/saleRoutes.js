const express = require("express");
const router = express.Router();

const saleController = require("../controllers/saleController");
const validate = require("../middleware/validate");
const { createSaleSchema } = require("../validators/saleValidator");

router.get("/", saleController.getSales);

router.get("/:id", saleController.getSaleById);

router.post(
    "/",
    validate(createSaleSchema),
    saleController.createSale
);

router.post("/:id/void", saleController.voidSale);

module.exports = router;
