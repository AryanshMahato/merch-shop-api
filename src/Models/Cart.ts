import { model, Schema } from "mongoose";
import CartType from "../../types/models/CartType";

const { ObjectId } = Schema.Types;

const cartSchema = new Schema({
  products: [
    {
      type: ObjectId,
      ref: "product"
    }
  ],
  count: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  user: {
    type: ObjectId,
    ref: "user",
    required: true
  }
});

class CartModel extends model("cart", cartSchema) {
  constructor(order: CartType) {
    super(order);
  }
}

export default CartModel;
