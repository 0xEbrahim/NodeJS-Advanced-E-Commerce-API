import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import SubCategory from "../models/subCategoryModel.js";
import Brand from "../models/brandModel.js";

/**
 * @desc    Create a product
 * @method  POST
 * @route   /api/v1/products/
 * @access  private
 */
const createProduct = asyncHandler(async (req, res, next) => {});

/**
 * @desc    Get all products
 * @method  GET
 * @route   /api/v1/products/
 * @access  public
 */
const getAllProducts = asyncHandler(async (req, res, next) => {});

/**
 * @desc    Get a single product
 * @method  GET
 * @route   /api/v1/products/:id
 * @access  public
 */
const getSingleProduct = asyncHandler(async (req, res, next) => {});

/**
 * @desc    Update prodyct
 * @method  PUT
 * @route   /api/v1/products/:id
 * @access  private
 */
const updateProduct = asyncHandler(async (req, res, next) => {});

/**
 * @desc    Delete product
 * @method  DELETE
 * @route   /api/v1/products/:id
 * @access  private
 */

const deleteProduct = asyncHandler(async (req, res, next) => {});

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
