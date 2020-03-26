declare namespace Express {
  interface Request {
    profile?: {
      _id?: string;
    };
    auth?: {
      _id: string;
      iat: number;
    };
  }
}
