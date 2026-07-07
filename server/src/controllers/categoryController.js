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

const getCategoryById = asyncHandler(async (req, res) => {

    const category = await categoryService.getCategoryById(req.params.id);

    return apiResponse.success(
        res,
        200,
        "Category retrieved successfully.",
        category
    );

});

const updateCategory = asyncHandler(async (req, res) => {

    const category = await categoryService.updateCategory(
        req.params.id,
        req.body
    );

    return apiResponse.success(
        res,
        200,
        "Category updated successfully.",
        category
    );

});

const deleteCategory = asyncHandler(async (req, res) => {

    const category = await categoryService.deleteCategory(req.params.id);

    return apiResponse.success(
        res,
        200,
        "Category deleted successfully.",
        category
    );

})

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};