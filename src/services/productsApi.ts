import api from '../api/axios';

export interface ProductPayload {
  name: string;
  price: number;
  stock: number;
  category: string;
  unit?: string;
}

export interface ProductResult {
  id?: string;
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  unit?: string;
  business?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getProducts = async (): Promise<ProductResult[]> => {
  const response = await api.get('/product/');
  
  const raw = response.data?.products?.products || [];
  
  if (!Array.isArray(raw)) {
    console.error('Products is not an array:', raw);
    return [];
  }
  
  return raw.map((item: any): ProductResult => ({
    id: item.id || item._id,
    _id: item._id || item.id,
    name: item.name,
    price: item.price,
    stock: item.stock,
    category: item.category,
    unit: item.unit || '',
  }));
};

export const addProduct = async (data: ProductPayload): Promise<ProductResult> => {
  const response = await api.post('/product/', data);
  return response.data?.result || response.data?.data || response.data;
};

export const getProduct = async (id: string): Promise<ProductResult> => {
  const response = await api.get(`/product/${id}`);
  return response.data?.result || response.data?.data || response.data;
};

export const updateProduct = async (
  id: string,
  data: Partial<ProductPayload>
): Promise<ProductResult> => {
  const response = await api.put(`/product/${id}`, data);
  return response.data?.result || response.data?.data || response.data;
};

export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/product/${id}`);
  return response.data?.result || response.data?.data || response.data;
};