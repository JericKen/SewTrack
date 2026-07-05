const express = require("express");
const router = express.Router();

const supplierController = require("../controllers/supplierController");
const validate = require("../middleware/validate");
const { createSupplierSchema } = require("../validators/supplierValidator");

router.post(
    "/",
    validate(createSupplierSchema),
    supplierController.createSupplier
);
router.get("/", supplierController.getSuppliers);

module.exports = router;