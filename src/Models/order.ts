import { model, Schema } from "mongoose";
import OrderType from "../../types/models/InputType/OrderType";

const { ObjectId } = Schema.Types;

const orderSchema = new Schema(
  {
    products: [{ type: ObjectId, ref: "product" }],
    transactionId: {},
    amount: { type: Number },
    address: String,
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
