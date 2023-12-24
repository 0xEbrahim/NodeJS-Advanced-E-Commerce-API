import Category from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
const getCategory = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "Success",
    resuls: categories.length,
    page,
    data: categories,
  });
});

/**
 * @desc    Get a specific category by id
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
const getASingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (category) res.status(200).json({ status: "Success", data: category });
  else return next(new ApiError(`No category with this ID: ${id}`, 404));
});

/**
 * @desc    Create Category
 * @route   POST /api/v1/categories
 * @access  Private
 */
const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ status: "Success", data: newCategory });
});

/**
 * @desc    Update category by ID
 * @route   PUT /api/v1/categories/:id
 * @access  Private
 */
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      ...req.body,
      slug: slugify(req.body.name),
    },
    { new: true }
  );
  if (!updatedCategory)
    return next(new ApiError(`No category with this ID: ${id}`, 404));
  else res.status(200).json({ status: "Success", data: updatedCategory });
});

/**
 * @desc    Delete category by ID
 * @route   DELETE /api/v1/categories/:id
 * @access  Private
 */
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory)
    return next(new ApiError(`No category with this ID: ${id}`, 404));
  else res.status(204).json({ status: "Success" });
});

export {
  createCategory,
  getCategory,
  getASingleCategory,
  updateCategory,
  deleteCategory,
};
