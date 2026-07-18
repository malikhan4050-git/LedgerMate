import api from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface EntryPayload {
  entryType: 'sale' | 'purchase';
  customer?: string;
  supplier?: string;
  itemsDescription: string;
  manualTotalPrice: number;
  transactionDate: string;
  notes?: string;
}

export const createEntry = async (data: EntryPayload) => {
  // Get business ID from AsyncStorage
  const businessStr = await AsyncStorage.getItem('business');
  const business = businessStr ? JSON.parse(businessStr) : null;
  
  const payload = {
    ...data,
    business: business?.id || business?._id, // Add business ID
  };
  
  const response = await api.post('/entry/', payload);
  return response.data;
};

export const getEntries = async (page: number = 1, limit: number = 20) => {
  const response = await api.get('/entry/', {
    params: { page, limit },
  });
  return response.data;
};

export const getEntry = async (id: string) => {
  const response = await api.get(`/entry/${id}`);
  return response.data;
};

export const updateEntry = async (id: string, data: Partial<EntryPayload>) => {
  const response = await api.put(`/entry/${id}`, data);
  return response.data;
};

export const deleteEntry = async (id: string) => {
  const response = await api.delete(`/entry/${id}`);
  return response.data;
};