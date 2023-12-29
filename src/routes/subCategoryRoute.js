import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getAsingleSubCategory,
  updateSubCategory,
} from "../services/subCategoryServices.js";
import {
  createSubCategoryValidator,
  deleteSubCategoriesValidator,
  getASingleSubCategoryValidator,
  updateSubCategoryValidator,
} from "../utils/validators/subCategoryValidator.js";
const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getAllSubCategories);
router
  .route("/:id")
  .get(getASingleSubCategoryValidator, getAsingleSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoriesValidator, deleteSubCategory);

export default router;
