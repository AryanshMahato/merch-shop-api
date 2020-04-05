import { Document } from "mongoose";
import IProduct from "./Product";

interface IOrder extends Document {
  products?: Array<IProduct>;
  transactId?: string;
  address?: string;
  amount?: number;
  //TODO: Add User Ref
  user?: string;
}

export default IOrder;
