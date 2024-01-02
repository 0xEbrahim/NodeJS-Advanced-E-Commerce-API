import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";
import Brand from "../models/brandModel.js";
import slugify from "slugify";
/**
 * @desc    Create a product
 * @method  POST
 * @route   /api/v1/products/
 * @access  private
 */
const createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create({ ...req.body });
  res.status(201).json({ status: "Success", data: newProduct });
});

/**
 * @desc    Get all products
 * @method  GET
 * @route   /api/v1/products/
 * @access  public
 */
const getAllProducts = asyncHandler(async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const products = await Product.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ status: "Success", data: products });
});

/**
 * @desc    Get a single product
 * @method  GET
 * @route   /api/v1/products/:id
 * @access  public
 */
const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product)
    return next(new ApiError(`No product with this ID: ${id}`, 404));
  res.status(200).json({ status: "Success", data: product });
});

/**
 * @desc    Update product
 * @method  PUT
 * @route   /api/v1/products/:id
 * @access  private
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.title) req.body.slug = slugify(req.body.title);
  const { id } = req.params;
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  if (!updatedProduct)
    if (!updatedProduct)
      return next(new ApiError(`No product with this ID: ${id}`, 404));
  res.status(200).json({ status: "Success", data: updatedProduct });
});

/**
 * @desc    Delete product
 * @method  DELETE
 * @route   /api/v1/products/:id
 * @access  private
 */

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
  if (!deletedProduct)
    return next(new ApiError(`No product with this ID: ${id}`, 404));
  res.status(204).json({ status: "Success", data: deletedProduct });
});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
