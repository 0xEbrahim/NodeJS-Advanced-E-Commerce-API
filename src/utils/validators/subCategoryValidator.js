import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("sub category name can't be empty")
    .isLength({ min: 2 })
    .withMessage("Too short sub category name")
    .isLength({ max: 32 })
    .withMessage("Too long sub category name"),
  check("category")
    .notEmpty()
    .withMessage("Category Id cannot be empty.")
    .isMongoId()
    .withMessage("Invalid sub category ID format."),
  validatorMiddleware,
  check("categoryId")
    .isMongoId()
    .withMessage("Invalid sub category ID format."),
];



const deleteSubCategoriesValidator = [
  check("id").isMongoId().withMessage("Invalid sub category ID format."),
  validatorMiddleware,
];

const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid sub category ID format."),
  validatorMiddleware,
];

const getASingleSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid sub category ID format."),
  validatorMiddleware,
];

export {
  getASingleSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoriesValidator,
  createSubCategoryValidator,
};
