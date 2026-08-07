import api from '../api/axios';

export interface PaymentPayload {
  customer: string;
  amount: number;
  note?: string;
  paymentDate?: string;
}

export interface PaymentResult {
  _id: string;
  customer: string;
  amount: number;
  note?: string;
  paymentDate: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ Create a new payment record
export const createPayment = async (data: PaymentPayload): Promise<PaymentResult> => {
  const response = await api.post('/payment/', data);
  return response.data?.result || response.data?.data || response.data;
};

// ✅ Get all payments for a customer
export const getPaymentsByCustomer = async (customerId: string): Promise<PaymentResult[]> => {
  const response = await api.get(`/payment/customer/${customerId}`);
  return response.data?.payments || response.data?.data || response.data || [];
};

// ✅ Get a single payment by ID
export const getPaymentById = async (id: string): Promise<PaymentResult> => {
  const response = await api.get(`/payment/${id}`);
  return response.data?.result || response.data?.data || response.data;
};

// ✅ Delete a payment record
export const deletePayment = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(`/payment/${id}`);
  return response.data?.result || response.data?.data || response.data;
};