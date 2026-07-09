import api from '../api/axios';

export interface SupplierPayload {
  name: string;
  email: string;
  phoneNo: string;
  address: string;
}

export interface SupplierResult {
  id?: string;
  _id?: string;
  name: string;
  email?: string;
  phoneNo?: string;
  address?: string;
}

export const addSupplier = async (data: SupplierPayload) => {
  const response = await api.post('/supplier/', data);
  return response.data;
};

// Hits GET /supplier/search?name=xxx
// Handles both response shapes: array of plain name strings, or array of
// objects that may only contain `name` (no id/email/phone/address yet).
export const searchSuppliers = async (
  name: string
): Promise<SupplierResult[]> => {
  const response = await api.get('/supplier/search', {
    params: { name },
  });

  const raw =
    response.data?.suppliers ??
    response.data?.data ??
    response.data?.results ??
    response.data ??
    [];

  return raw.map((item: any): SupplierResult => {
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