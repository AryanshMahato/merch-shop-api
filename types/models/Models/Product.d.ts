import { Document } from "mongoose";

interface IProduct extends Document {
  name?: string;
  description?: string;
  price?: number;
  //TODO: Add Category Ref
  category?: string;
  stock?: number;
  sold?: number;
  imageName?: string;
}

export default IProduct;
