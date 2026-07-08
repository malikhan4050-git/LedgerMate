import api from '../api/axios'; // same folder as api.ts

export interface EntryPayload {
  name: string;              // customer/supplier name
  entryType: 'sale' | 'purchase';
  itemsDescription: string;
  manualTotalPrice: number;
  transactionDate: string;   // ISO date string
}

export const createEntry = async (data: EntryPayload) => {
  const response = await api.post('/entry/', data);
  return response.data; // { success, message, entry }
};

export const getEntries = async () => {
  const response = await api.get('/entry/');
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