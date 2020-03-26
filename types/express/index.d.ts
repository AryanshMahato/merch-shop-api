declare namespace Express {
  interface Request {
    profile?: {
      _id?: number;
    };
    auth?: {
      _id: number;
      iat: number;
    };
  }
}
