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
import { setToBody } from "../middlewares/setCategoryIdToBody.js";
import { setToBody as filterObj } from "../middlewares/setFilterObject.js";

/**
 * @DESC merge params : Allow us to access parameters of another route
 */
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setToBody, createSubCategoryValidator, createSubCategory)
  .get(filterObj, getAllSubCategories);
router
  .route("/:id")
  .get(getASingleSubCategoryValidator, getAsingleSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoriesValidator, deleteSubCategory);

export default router;
