// Email Validation (Same as Backend)
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
};

// Phone Validation (Same as Backend)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^03\d{9}$/;
  return phoneRegex.test(phone.trim());
};

// Password Validation
export const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=])[A-Za-z\d@$!%*?&#^()_\-+=]{8,}$/;

  return passwordRegex.test(password);
};

// Name Validation
export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z ]{3,50}$/;
  return nameRegex.test(name.trim());
};

// ---------------------------
// Login Validation
// ---------------------------

export const validateLoginForm = (data: {
  emailORphoneNo: string;
  password: string;
}) => {
  const errors: {
    emailORphoneNo?: string;
    password?: string;
  } = {};

  if (!data.emailORphoneNo.trim()) {
    errors.emailORphoneNo = 'Email or Phone Number is required.';
  } else {
    const isPhone = /^03/.test(data.emailORphoneNo);

    if (isPhone) {
      if (!validatePhone(data.emailORphoneNo)) {
        errors.emailORphoneNo = 'Phone number must be in format 03XXXXXXXXX';
      }
    } else {
      if (!validateEmail(data.emailORphoneNo)) {
        errors.emailORphoneNo = 'Please enter a valid email address.';
      }
    }
  }

  if (!data.password.trim()) {
    errors.password = 'Password is required.';
  } else if (!validatePassword(data.password)) {
    errors.password =
      'Password must contain uppercase, lowercase, number, special character and be at least 8 characters.';
  }

  return errors;
};

// ---------------------------
// Signup Validation
// ---------------------------

export const validateSignupForm = (
  data: {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    confirmPassword: string;
  },
  agree: boolean,
) => {
  const errors: {
    name?: string;
    email?: string;
    phoneNo?: string;
    password?: string;
    confirmPassword?: string;
    agree?: string;
  } = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required.';
  } else if (!validateName(data.name)) {
    errors.name = 'Name must contain only letters (3-50 characters).';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.phoneNo.trim()) {
    errors.phoneNo = 'Phone Number is required.';
  } else if (!validatePhone(data.phoneNo)) {
    errors.phoneNo = 'Phone number must be in format 03XXXXXXXXX';
  }

  if (!data.password.trim()) {
    errors.password = 'Password is required.';
  } else if (!validatePassword(data.password)) {
    errors.password =
      'Password must contain uppercase, lowercase, number, special character and be at least 8 characters.';
  }

  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (!agree) {
    errors.agree = 'Please accept the Terms and Privacy Policy.';
  }

  return errors;
};

// ---------------------------
// Business Validation
// ---------------------------

export const validateBusinessForm = (data: {
  businessName: string;
  ownerName: string;
  phoneNo: string;
  businessType: string;
  address: string;
  mode: 'simple' | 'advanced';
  currency: string;
}) => {
  const errors: {
    businessName?: string;
    ownerName?: string;
    phoneNo?: string;
    businessType?: string;
    address?: string;
    currency?: string;
  } = {};

  if (!data.businessName.trim()) {
    errors.businessName = 'Business name is required.';
  }

  if (!data.ownerName.trim()) {
    errors.ownerName = 'Owner name is required.';
  }

  if (!data.phoneNo.trim()) {
    errors.phoneNo = 'Phone number is required.';
  } else if (!/^03\d{9}$/.test(data.phoneNo)) {
    errors.phoneNo = 'Phone number must be in format 03XXXXXXXXX.';
  }

  return errors;
};
