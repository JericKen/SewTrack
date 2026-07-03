const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");
const validate = require("../middleware/validate");
const { createCategorySchema } = require("../validators/categoryValidator");

router.post(
    "/",
    validate(createCategorySchema),
    categoryController.createCategory
);

router.get("/", categoryController.getCategories);

module.exports = router;