import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

const createBrandValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Category name is too short.")
    .isLength({ max: 32 })
    .withMessage("Category name is too long.")
    .notEmpty()
    .withMessage("Category name is required."),
  validatorMiddleware,
];
const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand ID format."),
  validatorMiddleware,
];
const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid brand ID format."),
  validatorMiddleware,
];

const getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];

export {
  getBrandValidator,updateBrandValidator,
  deleteBrandValidator,
  createBrandValidator,
};
