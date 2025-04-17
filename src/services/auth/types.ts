export type token = string;

export interface Register {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthResponse {
  data: token;
}

export interface Login {
  email: string;
  password: string;
}
