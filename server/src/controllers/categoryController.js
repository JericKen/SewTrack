const categoryService = require("../services/categoryService");
const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");

const createCategory = asyncHandler(async (req, res) => {

    const category = await categoryService.createCategory(req.body);

    return apiResponse.success(
        res,
        201,
        "Category created successfully.",
        category
    );

});

const getCategories = asyncHandler(async (req, res) => {

    const categories = await categoryService.getCategories();

    return apiResponse.success(
        res,
        200,
        "Categories retrieved successfully.",
        categories
    );

});

module.exports = {
    createCategory,
    getCategories
};