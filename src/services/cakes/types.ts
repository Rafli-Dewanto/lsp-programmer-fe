export interface Cake {
  id: number;
  title: string;
  description: string;
  rating: number;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: DeletedAt;
}

export interface DeletedAt {
  Time: Date;
  Valid: boolean;
}
