export interface Menu {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: menuCategory;
  rating?: number;
  image: string;
}

export interface DeletedAt {
  Time: Date;
  Valid: boolean;
}

export type menuCategory =
  | "all"
  | "wedding_cake"
  | "birthday_cake"
  | "cup_cake"
  | "seasonal_cake"
  | "other";

export type MenuQueryParams = {
  page?: number;
  title?: string;
  price?: number;
  limit?: number;
  category?: menuCategory | "";
};
