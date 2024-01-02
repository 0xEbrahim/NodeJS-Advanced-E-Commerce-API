import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../services/productServices.js";
import {
  createProductValidator,
  deleteProductValidator,
  getSingleProductValidator,
  updateProductValidator,
} from "../utils/validators/productValidator.js";
const router = express.Router();

router
  .route("/")
  .post(createProductValidator, createProduct)
  .get(getAllProducts);
router
  .route("/:id")
  .get(getSingleProductValidator, getSingleProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
