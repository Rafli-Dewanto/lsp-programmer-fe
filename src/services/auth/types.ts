export type Token = string;

export interface Register {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthResponse {
  data: Token;
}

export interface Login {
  email: string;
  password: string;
}
