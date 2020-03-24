import * as mongoose from "mongoose";

interface ProductType {
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  stock?: number;
  sold?: number;
  photo?: Buffer;
}

export default ProductType;
