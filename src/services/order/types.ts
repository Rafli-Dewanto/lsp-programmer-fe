export interface OrderPayload {
  items: Item[];
}

export interface Item {
  menu_id: number;
  quantity: number;
  title?: string;
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
  food_status: string;
  delivery_address: string;
  items: Items[];
  created_at: Date;
  updated_at: Date;
};

export type Customer = {
  id: number;
  name: string;
  email: string;
  address: string;
};

export type Items = {
  id: number;
  menu: Menu;
  quantity: number;
  price: number;
};

export type Menu = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image_url: string;
};

export type FoodStatus =
  | "pending"
  | "delivered"
  | "cancelled"
  | "ready"
  | "cooking";
