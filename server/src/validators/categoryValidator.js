const { z } = require("zod");
const { describe } = require("zod/v4/core");

const createCategorySchema = z.object({
    code: z
        .string()
        .trim()
        .min(2, "Category code is required.")
        .max(5, "Category code cannot exceed 5 characters.")
        .transform(value => value.toUpperCase()),

    name: z
        .string()
        .trim()
        .min(1, "Category name is required.")
        .max(50, "Category name cannot exceed 50 characters."),

    description: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters.")
        .optional()
});

const updateCategorySchema = z.object({
    code: z
        .string()
        .trim()
        .min(2, "Category code is required.")
        .max(5, "Category code cannot exceed 5 characters.")
        .transform(value => value.toUpperCase()),
        
    name: z
        .string()
        .trim()
        .min(1, "Category name is required.")
        .max(50, "Category name cannot exceed 50 characters."),

    description: z
        .string()
        .trim()
        .max(255, "Description cannot exceed 255 characters.")
        .optional()
}); 

module.exports = {
    createCategorySchema,
    updateCategorySchema,
};