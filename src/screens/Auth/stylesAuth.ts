import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.screenPadding,
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },

  header: {
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginTop: 6,
  },

  formContainer: {
    width: '100%',
  },

  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 6,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Colors.primaryText,
    backgroundColor: Colors.white,
  },

  inputError: {
    borderColor: '#FF3B30',
    borderWidth: 1.5,
  },

  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
    marginLeft: 4,
  },

  buttonWrapper: {
    marginTop: 8,
    width: '100%',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  bottomText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },

  linkText: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
    marginLeft: 4,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },

  otpInput: {
    width: 50,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryText,
    backgroundColor: Colors.white,
  },

  otpInputActive: {
    borderColor: '#1E90FF',
    borderWidth: 2,
  },

  otpInputError: {
    borderColor: '#FF3B30',
    borderWidth: 1.5,
  },

  timerText: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginTop: 8,
  },

  resendButton: {
    marginTop: 4,
    alignItems: 'center',
  },

  resendButtonText: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '600',
  },

  resendButtonDisabled: {
    opacity: 0.5,
  },

  passwordContainer: {
    position: 'relative',
  },

  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.borderRadius,
    zIndex: 999,
  },

  loadingText: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 8,
  },

  // Add these styles to your existing stylesAuth.ts

// Token Status Styles (for ResetPasswordScreen)
tokenStatusContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E8F5E9',
  borderRadius: Sizes.borderRadius,
  paddingVertical: 10,
  paddingHorizontal: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#C8E6C9',
},

tokenStatusError: {
  backgroundColor: '#FFEBEE',
  borderColor: '#FFCDD2',
},

tokenStatusText: {
  fontSize: 14,
  color: '#2E7D32',
  marginLeft: 8,
  fontWeight: '500',
},

tokenStatusErrorText: {
  fontSize: 14,
  color: '#C62828',
  marginLeft: 8,
  fontWeight: '500',
},

// Password Requirements
requirementsContainer: {
  backgroundColor: '#F5F5F5',
  borderRadius: Sizes.borderRadius,
  padding: 14,
  marginTop: 4,
  marginBottom: 12,
},

requirementsTitle: {
  fontSize: 13,
  fontWeight: '600',
  color: Colors.primaryText,
  marginBottom: 8,
},

requirementItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
  gap: 8,
},

requirementText: {
  fontSize: 13,
  color: '#8E8E93',
},

requirementMet: {
  color: '#2E7D32',
},

// Forgot Password Container (for LoginScreen)
forgotContainer: {
  alignItems: 'flex-end',
  marginBottom: 16,
},

forgotText: {
  fontSize: 14,
  color: '#1E90FF',
  fontWeight: '500',
},
});