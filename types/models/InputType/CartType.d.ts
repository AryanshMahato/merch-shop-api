import ProductType from "./ProductType";

interface CartType {
  products?: Array<ProductType>;
  user: string;
}

export default CartType;
