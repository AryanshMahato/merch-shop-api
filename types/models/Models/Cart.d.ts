import { Document } from "mongoose";
import IProduct from "./Product";

interface ICart extends Document {
  products?: Array<IProduct>;
  count?: number;
  price?: number;
  //TODO: Add User Ref
  user?: string;
}

export default ICart;
