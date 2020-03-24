import mongoose from "mongoose";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const connectMongoose = () =>
  mongoose.connect("mongodb://localhost:27017/merch-shop", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

export default connectMongoose;
