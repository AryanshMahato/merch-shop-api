import { model, Schema } from "mongoose";
import OrderType from "../../types/models/OrderType";
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

class OrderModel extends model("order", orderSchema) {
  constructor(order: OrderType) {
    super(order);
  }
}

export default OrderModel;
