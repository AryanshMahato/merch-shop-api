import multer from "multer";
import { v1 as uuidv1 } from "uuid";

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function(req, file, callback) {
    const fileExtension = file.mimetype.split("/")[1];
    callback(null, `${uuidv1()}.${fileExtension}`);
  }
});

const mMulter = multer({ storage: storage });

export default mMulter;
