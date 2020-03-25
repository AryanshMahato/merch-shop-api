import { Response } from "express";

const noUserFound = (email: any, res: Response) => {
  res.status(404).json({
    message: "USER email doesn't exist",
    email: email
  });
};

export default noUserFound;
