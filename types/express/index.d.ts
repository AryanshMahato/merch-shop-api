declare namespace Express {
  interface Request {
    profile?: {
      _id?: string;
    };
    auth?: {
      _id: string;
      iat: number;
    };
    category?: any;
    product?: any;
    order?: any;
    user?: any;
    cart?: any;
  }
}
