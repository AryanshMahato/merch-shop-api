import mongoose, { Schema } from "mongoose";
import UserType from "../Interface/UserType";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    userInfo: {
      type: String,
      trim: true
    },
    encry_password: {
      type: String,
      required: true
    },
    salt: String,
    role: { type: Number, default: 0 },
    purchases: {
      type: Array,
      default: []
    },
    first: String,
    last: String
  },
  { timestamps: true }
);

// Virtual Method to set password
userSchema
  .virtual("password")
  .set(function(this: any, password: string) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.hashPassword(password);
  })
  .get(function(this: any) {
    return this._password;
  });

// Method to hash and compare password
userSchema.method({
  authenticate: function(plainPassword: string) {
    return this.hashPassword(plainPassword) === this.encry_password;
  },
  hashPassword: function(plainPassword: string) {
    if (!plainPassword) {
      return "";
    }
    return crypto
      .createHmac("sha256", this.salt)
      .update(plainPassword)
      .digest("hex");
  }
});

// For IntelliSense
class UserModel extends mongoose.model("user", userSchema) {
  [x: string]: any;
  constructor(userInfo: UserType) {
    super(userInfo);
    
  }
}

export default UserModel;
