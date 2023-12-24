import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

const getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];

const createCategoryValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Category name is too short.")
    .isLength({ max: 32 })
    .withMessage("Category name is too long.")
    .notEmpty()
    .withMessage("Category name is required."),
  validatorMiddleware,
];

const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];

const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];

export {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
};
