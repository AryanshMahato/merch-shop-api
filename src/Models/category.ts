import { model, Schema } from "mongoose";
import CategoryType from "../Interface/CategoryType";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    }
  },
  { timestamps: true }
);

class categoryModel extends model("category", categorySchema) {
  constructor(category: CategoryType) {
    super(category);
  }
}

export default categoryModel;
