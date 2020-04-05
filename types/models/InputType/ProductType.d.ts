import * as mongoose from "mongoose";

interface ProductType {
  name: string;
  description: string;
  price: string;
  category: mongoose.Schema.Types.ObjectId;
  stock?: string;
  sold?: string;
  photo?: Buffer;
}

export default ProductType;
