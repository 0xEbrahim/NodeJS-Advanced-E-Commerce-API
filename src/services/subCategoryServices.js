import asyncHandler from "express-async-handler";
import SubCategory from "../models/subCategoryModel.js";
import slugify from "slugify";
import ApiError from "../utils/apiError.js";
import Category from "../models/categoryModel.js";

/**
 * @desc    Get all sub categories
 * @route   GET /api/v1/categories/sub-categories
 * @access  Public
 */
const getAllSubCategories = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "Success",
    resuls: subCategories.length,
    page,
    data: subCategories,
  });
});

/**
 * @desc    Get a specific sub category by id
 * @route   GET /api/v1/categories/sub-categories/:id
 * @access  Public
 */
const getAsingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id).populate("category");
  if (subCategory)
    res.status(200).json({ status: "Success", data: subCategory });
  else return next(new ApiError(`No sub category with this ID: ${id}`, 404));
});

/**
 * @desc    Create sub Category
 * @route   POST /api/v1/categories/sub-categories
 * @access  Private
 */
const createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, categoryId } = req.body;
  const parentCategory = await Category.findById(categoryId);
  if (!parentCategory)
    return next(new ApiError(`No category with this ID: ${categoryId}`, 404));
  const newSubCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category: categoryId,
  });
  res.status(201).json({ status: "Success", data: newSubCategory });
});

/**
 * @desc    Update sub category by ID
 * @route   PUT /api/v1/categories/sub-categories/:id
 * @access  Private
 */
const updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedSubCategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!updatedSubCategory)
    return next(new ApiError(`No sub category with this ID: ${id}`, 404));
  res.status(200).json({ status: "Success", data: updatedSubCategory });
});

/**
 * @desc    Delete sub category by ID
 * @route   DELETE /api/v1/categories/sub-categories/:id
 * @access  Private
 */
const deleteSubCategory = asyncHandler(async (req, res, next) => {
const { id } = req.params;
const subCategory = await SubCategory.findById(id);
if (!subCategory)
  return next(new ApiError(`No category with this ID: ${id}`, 404));
await SubCategory.findByIdAndDelete(id);
res.status(204).json({ status: "Success", data:{} });
});

export {
  getAllSubCategories,
  getAsingleSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
