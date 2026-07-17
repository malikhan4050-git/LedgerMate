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

// GET /product/ - Fetch all products
export const getProducts = async (): Promise<ProductResult[]> => {
  const response = await api.get('/product/');
  
  const raw =
    response.data?.products ??
    response.data?.data ??
    response.data?.result ??
    response.data ??
    [];
  
  return raw.map((item: any): ProductResult => ({
    id: item.id || item._id,
    _id: item._id || item.id,
    name: item.name,
    price: item.price,
    stock: item.stock,
    category: item.category,
    unit: item.unit,

  }));
};

// POST /product/ - Add a new product
export const addProduct = async (data: ProductPayload): Promise<ProductResult> => {
  const response = await api.post('/product/', data);
  return response.data?.result || response.data?.data || response.data;
};

// GET /product/:id - Get a single product by ID
export const getProduct = async (id: string): Promise<ProductResult> => {
  const response = await api.get(`/product/${id}`);
  return response.data?.result || response.data?.data || response.data;
};

// PUT /product/:id - Update a product
export const updateProduct = async (
  id: string,
  data: Partial<ProductPayload>
): Promise<ProductResult> => {
  const response = await api.put(`/product/${id}`, data);
  return response.data?.result || response.data?.data || response.data;
};

// DELETE /product/:id - Delete a product
export const deleteProduct = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/product/${id}`);
  return response.data?.result || response.data?.data || response.data;
};