import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "sub-Category name is required."],
      trim: true,
      unique: [true, "Sub-category name should be unique."],
      minlength: [3, "Too short sub-category name"],
      maxlength: [32, "Too long sub-category name."],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Sub-category must be a part of main category."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SubCategory", subCategorySchema);
