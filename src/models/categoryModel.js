import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      unique: [true, "category name should be unique."],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name."],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image:{
        type : String
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Category", categorySchema);
