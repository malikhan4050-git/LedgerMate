import api from '../api/axios'; // same folder as api.ts

export interface CustomerPayload {
  name: string;
  email: string;
  phoneNo: string;
  address: string;
}

export interface CustomerResult {
  id?: string;
  _id?: string;
  name: string;
  email?: string;
  phoneNo?: string;
  address?: string;
}

// isSale true => customer, false => supplier (same endpoint, adjust if backend differs)
export const addCustomer = async (data: CustomerPayload) => {
  const response = await api.post('/customer/', data);
  return response.data;
};

// Search customers/suppliers by name.
// ASSUMPTION: backend supports GET /customer?name=xxx&type=sale|purchase
// Adjust the URL/params below to match your actual backend route.
export const searchCustomers = async (
  name: string,
  type: 'sale' | 'purchase'
): Promise<CustomerResult[]> => {
  const response = await api.get('/customer', {
    params: { name, type },
  });
  // adjust based on actual response shape, e.g. response.data.customers
  return response.data?.customers ?? response.data?.data ?? response.data ?? [];
};