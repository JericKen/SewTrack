const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");

const categoryController = require("../controllers/categoryController");
const { createCategorySchema } = require("../validators/categoryValidator");
const { updateCategorySchema } = require("../validators/categoryValidator");

router.post(
    "/",
    validate(createCategorySchema),
    categoryController.createCategory
);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put(
    "/:id",
    validate(updateCategorySchema),
    categoryController.updateCategory
);
router.delete(
    "/:id",
    categoryController.deleteCategory
)

module.exports = router;