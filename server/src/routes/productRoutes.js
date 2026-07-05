const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validate = require("../middleware/validate");
const { createProductSchema } = require("../validators/productValidator");

router.post(
    "/",
    validate(createProductSchema),
    productController.createProduct
);

module.exports = router;