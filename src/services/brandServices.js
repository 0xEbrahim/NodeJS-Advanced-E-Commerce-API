import asyncHandler from "express-async-handler";
import slugify from "slugify";
import Brand from "../models/brandModel.js";
import ApiError from "../utils/apiError.js";

/**
 * @desc    Get all brands
 * @method  GET
 * @route   /api/v1/brands
 * @access  public
 */

const getAllBrands = asyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: "Success",
    resuls: brands.length,
    page,
    data: brands,
  });
});

/**
 * @desc    Get a specific brand
 * @method  Get
 * @rouet   /api/v1/brands/:id
 * @access  public
 */

const getASingleBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) return next(new ApiError(`No brand with this ID: ${id}`, 404));
  res.status(200).json({ status: "Success", data: brand });
});

/**
 * @desc    Create brand
 * @method  POST
 * @rouet   /api/v1/brands/
 * @access  private
 */

const createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const newBrand = await Brand.create({ name: name, slug: slugify(name) });
  res.status(201).json({ status: "success", data: newBrand });
});

/**
 * @desc    update brand
 * @method  PUT
 * @rouet   /api/v1/brands/:id
 * @access  private
 */

const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    {
      name: name,
      slug: slugify(name),
    },
    { new: true }
  );
  if (!updatedBrand)
    return next(new ApiError(`No brand with this ID: ${id}`, 404));
  res.status(200).json({ status: "Success", data: updatedBrand });
});

/**
 * @desc    delete brand
 * @method  DELETE
 * @rouet   /api/v1/brands/:id
 * @access  private
 */

const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedBrand = await Brand.findByIdAndDelete(id);
  if (!deletedBrand)
    return next(new ApiError(`No brand with this ID: ${id}`, 404));
  res.status(204).json({ status: "Success", data: deletedBrand });
});

export { getASingleBrand, getAllBrands, createBrand, updateBrand, deleteBrand };
