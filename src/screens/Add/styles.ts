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
    paddingTop: 10,
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

  searchIcon: {
    // ✅ Add this
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
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
  // Product Selection Styles
  selectedProductsContainer: {
    marginTop: 12,
  },

  selectedProductsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondaryText,
    marginBottom: 8,
  },

  selectedProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  selectedProductHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  selectedProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
    flex: 1,
  },

  removeProductButton: {
    padding: 4,
  },

  selectedProductBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    minWidth: 20,
    textAlign: 'center',
  },

  unitText: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginLeft: 4,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  priceLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
  },

  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
  },

  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },

  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  productDropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  productDropdownPrice: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  finalTotalBox: {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9',
  },

  finalTotalBoxValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  // Optional: Add a container for the discount section
  discountContainer: {
    marginTop: 4,
  },
  // Product Search Row Styles
  productSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  productSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    height: 48,
  },

  productSearchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
    padding: 0,
  },

  // Quantity Selector
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    height: 48,
    minWidth: 100,
    justifyContent: 'center',
  },

  quantityBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    minWidth: 30,
    textAlign: 'center',
  },

  // Add Product Button
  addProductButtonWrapper: {
    marginTop: 4,
    marginBottom: 12,
  },

  addProductButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Selected Products List
  selectedProductsList: {
    marginTop: 8,
  },

  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  productRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  productRowName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primaryText,
    flex: 1,
  },

  productRowQty: {
    fontSize: 13,
    color: Colors.secondaryText,
    marginLeft: 8,
  },

  productRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  productRowPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E90FF',
    marginRight: 8,
  },

  productRowRemove: {
    padding: 4,
  },
  // Add Product Button - Simple Button
  addProductButton: {
    width: '100%',
    height: 44,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    marginTop: 4,
    marginBottom: 12,
  },
  // Totals Row
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },

  totalFieldContainer: {
    flex: 1,
  },

  totalLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondaryText,
    marginBottom: 4,
  },

  totalBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },

  totalBoxValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  // Discount Input inside box
  discountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  discountCurrency: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.secondaryText,
    marginRight: 2,
  },

  discountInput: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    padding: 0,
    minWidth: 40,
    maxWidth: 70,
  },
});
