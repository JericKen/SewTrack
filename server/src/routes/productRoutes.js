const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validate = require("../middleware/validate");
const { createProductSchema } = require("../validators/productValidator");

router.get(
    "/",
    productController.getProducts
)

router.post(
    "/",
    validate(createProductSchema),
    productController.createProduct
);

module.exports = router;