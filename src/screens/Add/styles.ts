import { StyleSheet } from 'react-native';

import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.screenPadding,
  },
  header: {
    marginTop: 10,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  headerSubtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 2,
  },

  fieldContainer: {
    marginBottom: 14,
  },

  label: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 6,
    fontWeight: '600',
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

  addRow: {
    marginTop: 14,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  buttonText: {
    fontSize: 14,
  },

  addButtonWrapper: {
    marginBottom: 20,
    width: '100%',
  },

  inputText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },

  placeholderText: {
    fontSize: 16,
    color: '#8E8E93',
    flex: 1,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 48,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },

  dropdownIcon: {
    padding: 4,
  },

  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
    maxHeight: 200,
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  dropdownItemSelected: {
    backgroundColor: '#F0F8FF',
  },

  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },

  dropdownItemTextSelected: {
    color: '#1E90FF',
    fontWeight: '600',
  },

  noResults: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginTop: 4,
    alignItems: 'center',
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    zIndex: 999,
  },

  noResultsText: {
    fontSize: 14,
    color: '#8E8E93',
  },

  sectionContainer: {
    marginBottom: 14,
  },

  sectionLabel: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 6,
    fontWeight: '600',
  },

  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Colors.primaryText,
    backgroundColor: Colors.white,
    minHeight: 100,
    maxHeight: 150,
  },

  hintText: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
    fontStyle: 'italic',
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    height: 48,
  },

  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginRight: 8,
  },

  amountInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.primaryText,
    padding: 0,
  },

  keyboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  cancelButton: {
    width: '100%',
    height: 48,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 10,
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryText,
  },

  saveButtonWrapper: {
    width: '100%',
    marginTop: 20,
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

  // Modal styles
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
  },

  loadingContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },

  // === NEW DATE/TIME STYLES (deduped) ===
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // use margin if gap isn't supported
  },

  dateTimeInput: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },

  dateInput: {
    flex: 1.2, // slightly more space for date
  },

  timeInput: {
    flex: 0.9,
  },

  dateTimeText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },

  calendarIcon: {
    padding: 8,
    backgroundColor: '#F0F4FF',
    borderRadius: 8,
  },
});
