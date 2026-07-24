// Helper functions for Profile screens

export const validateEmail = (email: string): boolean => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[0-9+\-\s()]{7,15}$/;
  return regex.test(phone);
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Format as needed
  return cleaned;
};

export const getInitials = (name: string): string => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
};