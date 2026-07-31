import { StyleSheet } from 'react-native';

import Colors from '../../../theme/Colors';
import Sizes from '../../../theme/Sizes';

export default StyleSheet.create({
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Content
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.borderRadius,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 20,
    textAlign: 'center',
  },

  modalKeyboardContainer: {
    flex: 1,
  },

  // Form Fields
  modalFieldContainer: {
    marginBottom: 14,
  },

  modalLabel: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 6,
    fontWeight: '600',
  },

  modalInput: {
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

  // Buttons
  modalSaveButtonWrapper: {
    width: '100%',
    marginTop: 10,
  },

  modalCancelButton: {
    width: '100%',
    height: 48,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: 10,
  },

  modalCancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryText,
  },

  // Error Styles
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

  // Button Text
  buttonText: {
    fontSize: 14,
  },
});