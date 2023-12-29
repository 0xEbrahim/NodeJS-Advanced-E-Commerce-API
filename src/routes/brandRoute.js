import express from "express";
import {
  createBrand,
  deleteBrand,
  getASingleBrand,
  getAllBrands,
  updateBrand,
} from "../services/brandServices.js";
import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from "../utils/validators/brandValidator.js";
const router = express.Router();

router.route("/").post(createBrandValidator, createBrand).get(getAllBrands);
router
  .route("/:id")
  .get(getBrandValidator, getASingleBrand)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
