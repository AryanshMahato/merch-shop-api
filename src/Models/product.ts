import { model, Schema } from "mongoose";
import ProductType from "../../types/models/ProductType";

const { ObjectId } = Schema.Types;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: Number,
      required: true,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      type: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

class productModel extends model("product", productSchema) {
  constructor(product: ProductType) {
    super(product);
  }
}

export default productModel;
