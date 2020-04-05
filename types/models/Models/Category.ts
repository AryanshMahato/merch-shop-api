import { Document } from "mongoose";
import IUser from "./User";

interface ICategory extends Document {
  name?: string;
  createdBy?: IUser;
}

export default ICategory;
