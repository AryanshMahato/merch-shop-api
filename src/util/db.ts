import mongoose from "mongoose";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const connectMongoose = () =>
  mongoose.connect(process.env.DATABASE_CONNECTION_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

export default connectMongoose;
