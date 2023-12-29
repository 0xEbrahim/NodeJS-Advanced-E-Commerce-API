import asyncHandler from "express-async-handler";
import slugify from "slugify";

import Category from "../models/categoryModel.js";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Get all categories
 * @method  GET
 * @route   /api/v1/categories
 * @access  public
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
 * @method  GET
 * @route   /api/v1/categories/:id
 * @access  public
 */
const getASingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (category) res.status(200).json({ status: "Success", data: category });
  else return next(new ApiError(`No category with this ID: ${id}`, 404));
});

/**
 * @desc    Create Category
 * @method  POST
 * @route   /api/v1/categories
 * @access  private
 */
const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newCategory = await Category.create({ name, slug: slugify(name) });
  res.status(201).json({ status: "Success", data: newCategory });
});

/**
 * @desc    Update category by ID
 * @method  PUT
 * @route   /api/v1/categories/:id
 * @access  private
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
   res.status(200).json({ status: "Success", data: updatedCategory });
});

/**
 * @desc    Delete category by ID
 * @method  DELETE
 * @route   /api/v1/categories/:id
 * @access  private
 */
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category)
    return next(new ApiError(`No category with this ID: ${id}`, 404));
  await Category.findByIdAndDelete(id);
  res.status(204).json({ status: "Success",  data:{} });
});

export {
  createCategory,
  getCategory,
  getASingleCategory,
  updateCategory,
  deleteCategory,
};
