import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required."],
      unique: [true, "Brand name should be unique."],
      minlength: [3, "Too short brand name"],
      maxlength: [32, "Too long brand name."],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Brand", brandSchema);
