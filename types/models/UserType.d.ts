interface UserType {
  name: string;
  lastName?: string;
  email: string;
  userInfo?: string;
  //TODO: Comeback Here
  password: string;
  salt?: string;
  role?: number;
  purchases?: Array<any>;
  first?: string;
  last?: string;
  cart: string;
}

export default UserType;
