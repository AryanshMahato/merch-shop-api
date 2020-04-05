import { Request, Response } from "express";

const signOut = (req: Request, res: Response) => {
  res.status(200).json({
    message: "SignOut Successful"
  });
};

export default signOut;
