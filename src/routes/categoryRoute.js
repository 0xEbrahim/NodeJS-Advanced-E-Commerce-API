import express from "express";
import {
  createCategory,
  deleteCategory,
  getASingleCategory,
  getCategory,
  updateCategory,
} from "../services/categoryServices.js";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from "../utils/validators/categoryValidator.js";
const router = express.Router();

router
  .route("/")
  .post(createCategoryValidator, createCategory)
  .get(getCategory);

router
  .route("/:id")
  .get(getCategoryValidator, getASingleCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
export default router;
