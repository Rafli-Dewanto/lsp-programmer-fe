export type AddToCartPayload = {
  cake_id: number;
  quantity: number;
};

export type CartResponse = {
  id: number;
  customer_id: number;
  name: string;
  image: string;
  cake_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;
};
