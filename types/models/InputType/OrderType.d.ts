interface OrderType {
  products: Array<string>;
  transactionId: string;
  amount: number;
  user: string;
}

export default OrderType;
