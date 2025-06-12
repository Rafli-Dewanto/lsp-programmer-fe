export type CreateInventory = {
  name: string;
  quantity: number;
  unit: string;
  minimum_stock: number;
  reorder_point: number;
  unit_price: number;
};

export type UpdateInventory = {
  name: string;
  quantity: number;
  unit: string;
  minimum_stock: number;
  reorder_point: number;
  unit_price: number;
};

export type Inventory = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  minimum_stock: number;
  reorder_point: number;
  unit_price: number;
  last_restock_date: string;
  created_at: string;
  updated_at: string;
};
