import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BusinessMode = 'simple' | 'advanced';

export interface BusinessDetailsState {
  businessName: string;
  ownerName: string;
  phoneNo: string;
  businessType: string;
  address: string;
  currency: string;
  mode: BusinessMode;
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  phoneNo?: string; // Add this field
}

export interface SessionState {
  token: string | null;
  user: UserState | null;
  business: BusinessDetailsState | null;
}

const initialState: SessionState = {
  token: null,
  user: null,
  business: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionState>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.business = action.payload.business;
    },
    clearSession(state) {
      state.token = null;
      state.user = null;
      state.business = null;
    },
    updateBusiness(state, action: PayloadAction<BusinessDetailsState>) {
      state.business = action.payload;
    },
    updateUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload;
    },
  },
});

export const { setSession, clearSession, updateBusiness, updateUser } = sessionSlice.actions;
export default sessionSlice.reducer;
