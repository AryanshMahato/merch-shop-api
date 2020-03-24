import { model, Schema } from "mongoose";
import OrderType from "../Interface/OrderType";
import { productCartSchema } from "./productCart";

const { ObjectId } = Schema.Types;

const orderSchema = new Schema(
  {
    products: [productCartSchema],
    transactionId: {},
    amount: { type: Number },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

class categoryModel extends model("order", orderSchema) {
  constructor(order: OrderType) {
    super(order);
  }
}

export default categoryModel;
