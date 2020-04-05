import { Document } from "mongoose";
import IProduct from "./Product";
import IUser from "./User";

interface IOrder extends Document {
  products?: Array<IProduct>;
  transactId?: string;
  address?: string;
  amount?: number;
  user?: IUser;
}

export default IOrder;
