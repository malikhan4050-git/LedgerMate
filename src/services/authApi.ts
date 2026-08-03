import api from '../api/axios';

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}

// Send password reset link to email
export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset password with token
export const resetPassword = async (token: string, newPassword: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// Verify reset token (optional - if you want to validate token before showing reset form)
export const verifyResetToken = async (token: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/verify-reset-token', { token });
  return response.data;
};