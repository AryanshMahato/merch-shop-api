import { Document } from "mongoose";
import ICategory from "./Category";

interface IProduct extends Document {
  name?: string;
  description?: string;
  price?: number;
  category?: ICategory;
  stock?: number;
  sold?: number;
  imageName?: string;
}

export default IProduct;
