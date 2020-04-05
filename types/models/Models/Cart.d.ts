import { Document } from "mongoose";
import IProduct from "./Product";
import IUser from "./User";

interface ICart extends Document {
  products?: Array<IProduct>;
  count?: number;
  price?: number;
  user?: IUser;
}

export default ICart;
