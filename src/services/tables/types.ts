export type UpdateAvailabilityPayload = {
  is_available: boolean;
};

export type CreateTablePayload = {
  table_number: number;
  capacity: number;
};

export type Table = {
  id: number;
  table_number: number;
  capacity: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
};
