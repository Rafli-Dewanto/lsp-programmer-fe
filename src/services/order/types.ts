export interface OrderPayload {
  items: Item[];
}

export interface Item {
  cake_id: number;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  token: string;
  redirect_url: string;
}

export type GetOrderResponse = {
  id: number;
  customer: Customer;
  status: string;
  total_price: number;
  delivery_address: string;
  items: Items[];
  created_at: Date;
  updated_at: Date;
}

export type Customer = {
  id: number;
  name: string;
  email: string;
  address: string;
}

export type Items = {
  id: number;
  cake: Cake;
  quantity: number;
  price: number;
}

export type Cake = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image_url: string;
}
