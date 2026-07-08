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

export const addCustomer = async (data: CustomerPayload) => {
  const response = await api.post('/customer/', data);
  return response.data;
};

// Hits GET /customer/search?name=xxx
// Handles both response shapes: array of plain name strings, or array of
// objects that may only contain `name` (no id/email/phone/address yet).
export const searchCustomers = async (
  name: string
): Promise<CustomerResult[]> => {
  const response = await api.get('/customer/search', {
    params: { query: name },
  });

  // TEMP DEBUG - remove once search is confirmed working
  console.log('searchCustomers raw response:', JSON.stringify(response.data));

  const raw =
    response.data?.customers ??
    response.data?.data ??
    response.data?.results ??
    response.data ??
    [];

  return raw.map((item: any): CustomerResult => {
    if (typeof item === 'string') {
      return { name: item };
    }
    return {
      id: item.id,
      _id: item._id,
      name: item.name,
      email: item.email,
      phoneNo: item.phoneNo,
      address: item.address,
    };
  });
};