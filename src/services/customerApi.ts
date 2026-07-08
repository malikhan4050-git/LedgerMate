import api from '../api/axios'; // adjust path to your api.ts file

export interface CustomerPayload {
  name: string;
  email: string;
  phoneNo: string;
  address: string;
}

// isSale true => customer, false => supplier (same endpoint, adjust if backend differs)
export const addCustomer = async (data: CustomerPayload) => {
  const response = await api.post('/customer/', data);
  return response.data;
};