import { model, Schema } from "mongoose";
import CategoryType from "../../types/models/CategoryType";

const { ObjectId } = Schema.Types;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true
    },
    createdBy: {
      type: ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

class CategoryModel extends model("category", categorySchema) {
  constructor(category: CategoryType) {
    super(category);
  }
}

export default CategoryModel;
