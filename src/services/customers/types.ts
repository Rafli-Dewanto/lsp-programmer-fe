export type CustomerResponse = {
  id: number;
  name: string;
  email: string;
  address: string;
};

export type UpdateCustomerPayload =  {
  name:    string;
  email:   string;
  address: string;
}
