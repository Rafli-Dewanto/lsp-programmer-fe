export type Reservation = {
  id: number;
  customer_id: number;
  customer: Customer;
  table_number: number;
  guest_count: number;
  reserve_date: Date;
  status: string;
  special_notes: string;
  created_at: Date;
  updated_at: Date;
};

export type Customer = {
  id: number;
  name: string;
  email: string;
  address: string;
};

export type UpdateReservation = {
  status: string;
  table_number: number;
  guest_count: number;
  reserve_date: Date;
  special_notes: string;
};

export type CreateReservationPayload = {
  guest_count: number;
  reserve_date: Date;
  special_notes: string;
};
