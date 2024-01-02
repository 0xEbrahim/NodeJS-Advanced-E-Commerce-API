import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "too long product title"],
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required."],
      minlength: [32, "Too short product description."],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: 150000,
    },
    priceAfterDiscount: {
      type: Number,
    },
    imageCover: {
      type: String,
      required: true,
    },
    colors: [{ type: String }],
    images: [{ type: String }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    }],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
    ratingsAverage:{
      type: Number,
      min: 1,
      max: 5,
    },
    ratingsQuantity:{
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
