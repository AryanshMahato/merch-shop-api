import { Document } from "mongoose";
import IOrder from "./Order";
import ICart from "./Cart";

interface IUser extends Document {
  name?: string;
  email?: string;
  userInfo?: string;
  encry_password?: string;
  salt?: string;
  role?: number;
  orders?: Array<IOrder>;
  cart?: ICart;
  //TODO: Add Virtual Methods
}

export default IUser;
