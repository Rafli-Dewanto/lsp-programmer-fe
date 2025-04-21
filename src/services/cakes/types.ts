export interface Cake {
  id: number;
  title: string;
  description: string;
  price: number;
  category: cakeCategory;
  rating: number;
  image_url: string;
}

export interface DeletedAt {
  Time: Date;
  Valid: boolean;
}

export type cakeCategory = "all" | "wedding_cake" | "birthday_cake" | "cup_cake" | "seasonal_cake" | "other";

export type CakesQueryParams = {
  page?: number;
  title?: string;
  price?: number;
  limit?: number;
  category?: cakeCategory | "";
}
