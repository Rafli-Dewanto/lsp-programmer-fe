export interface Cake {
  id: number;
  title: string;
  description: string;
  category: cakeCategory;
  rating: number;
  price: number;
  image_url: string;
}

export interface DeletedAt {
  Time: Date;
  Valid: boolean;
}

export type cakeCategory = "wedding_cake" | "birthday_cake" | "cup_cake" | "seasonal_cake" | "other";

export type CakesQueryParams = {
  page: number;
  title: string;
  price?: number;
  category: cakeCategory | "";
}
