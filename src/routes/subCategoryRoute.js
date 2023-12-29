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
import {
  setIdToBody,
  setObjFilterToBody,
} from "../middlewares/setParamsToBody.js";
/**
 * @DESC merge params : Allow us to access parameters of another route
 */
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setIdToBody, createSubCategoryValidator, createSubCategory)
  .get(setObjFilterToBody, getAllSubCategories);
router
  .route("/:id")
  .get(getASingleSubCategoryValidator, getAsingleSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoriesValidator, deleteSubCategory);

export default router;
