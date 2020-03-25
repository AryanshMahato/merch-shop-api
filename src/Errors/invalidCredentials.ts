import { Response } from "express";

const invalidCredentials = (res: Response) => {
  res.status(401).json({
    message: "Invalid Credentials"
  });
};

export default invalidCredentials;
