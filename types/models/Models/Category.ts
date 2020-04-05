import { Document } from "mongoose";

interface ICategory extends Document {
  name?: string;
  //TODO: Add User Ref
  createdBy?: string;
}

export default ICategory;
