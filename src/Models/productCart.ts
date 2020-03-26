import { model, Schema } from "mongoose";
import OrderType from "../../types/models/OrderType";

const { ObjectId } = Schema.Types;

const productCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: "product"
  },
  name: String,
  count: Number,
  price: Number
});

class productCartModel extends model("productCart", productCartSchema) {
  constructor(order: OrderType) {
    super(order);
  }
}

export default productCartModel;
export { productCartSchema };
