import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import Sizes from '../../../theme/Sizes';

export default StyleSheet.create({
  // ========== MODAL STYLES ==========

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

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

  modalSaveButtonWrapper: {
    width: '100%',
    marginTop: 10,
  },

  modalKeyboardContainer: {
    flex: 1,
  },

  // ========== ERROR STYLES ==========

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

  // ========== BUTTON TEXT ==========

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Delete Modal Styles
  deleteModalHeader: {
    alignItems: 'center',
    marginBottom: 12,
  },

  deleteModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 8,
  },

  deleteModalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },

  deleteModalSubtext: {
    fontSize: 14,
    textAlign: 'center',
    color: '#8E8E93',
    marginBottom: 20,
  },

  deleteModalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  deleteModalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Sizes.borderRadius,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },

  deleteModalCancelButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  deleteModalConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: Sizes.borderRadius,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
  },

  deleteModalConfirmButtonDisabled: {
    backgroundColor: '#FF9A95',
  },

  deleteModalConfirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
