import { check } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatorMiddleware.js";

const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title can't be empty")
    .isLength({ min: 3 })
    .withMessage("Too Short product title")
    .isLength({ max: 100 })
    .withMessage("Too long product title"),
  check("description")
    .notEmpty()
    .withMessage("Product description cannot be empty.")
    .isLength({ min: 32 })
    .withMessage("Too short product description.")
    .isLength({ max: 2000 })
    .withMessage("Too long product desription."),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity cannot be empty.")
    .isNumeric()
    .withMessage("Quantity of product should be a numerical value"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Quantity of product should be a numerical value"),
  check("price")
    .notEmpty()
    .withMessage("Produc orice cannot be empty")
    .isNumeric()
    .withMessage("Price should be a numerical value")
    .isLength({ max: 32 })
    .withMessage("Too long price number"),
  check("priceAfterDiscount")
    .optional()
    .toFloat()
    .isNumeric()
    .withMessage("Price should be a number")
    .custom((value, { req }) => {
      if (req.body.price <= value)
        throw new Error(
          "Price after discount must be lower than the main price"
        );
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("Available colors should be an array of string"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required."),
  check("images")
    .optional()
    .isArray()
    .withMessage("Images should be an array of string"),
  check("category")
    .notEmpty()
    .withMessage("any product should belong to a category")
    .isMongoId()
    .withMessage("Not valid MongoId"),
  check("subcategory").optional().isMongoId().withMessage("Not valid MongoId"),
  check("brand").optional().isMongoId().withMessage("Not valid MongoId"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Ratings should be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be greater than or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be less than or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingsQuantity should be a number."),
  validatorMiddleware,
];
const updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];
const deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];
const getSingleProductValidator = [
  check("id").isMongoId().withMessage("Invalid category ID format."),
  validatorMiddleware,
];

export {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getSingleProductValidator,
};
