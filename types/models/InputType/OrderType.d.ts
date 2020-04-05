interface OrderType {
  products: Array<string>;
  transactionId: string;
  amount: number;
  address: string;
  user: string;
}

export default OrderType;
