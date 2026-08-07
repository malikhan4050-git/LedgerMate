import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import Sizes from '../../../theme/Sizes';

export default StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: Sizes.screenPadding,
  },

  // Header - exactly like EditPersonalInfoScreen
  header: {
    marginTop: 35,
    marginBottom: 16,
    paddingHorizontal: Sizes.screenPadding,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  headerSubtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  // Avatar / Icon Section
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  avatarCustomer: {
    backgroundColor: '#1E90FF',
  },

  avatarSupplier: {
    backgroundColor: '#C62828',
  },

  avatarChangeText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },

  totalGreen: {
    color: '#2E7D32',
  },

  totalRed: {
    color: '#C62828',
  },

  // Field Container (for Receive Payment / Pay Supplier)
  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 6,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Sizes.borderRadius,
    backgroundColor: Colors.white,
    paddingHorizontal: 0,
  },

  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: Colors.primaryText,
  },

  // Transaction Items
  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  transactionDate: {
    fontSize: 12,
    color: Colors.secondaryText,
  },

  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  transactionAmountRed: {
    color: '#C62828',
  },

  transactionDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primaryText,
  },

  paymentNote: {
    fontSize: 12,
    color: '#2E7D32',
    marginTop: 4,
    fontStyle: 'italic',
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginTop: 8,
  },

  emptySubtext: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  // Buttons - Stacked Vertically (exactly like EditPersonalInfoScreen)
  buttonContainer: {
    flexDirection: 'column',
    marginTop: 20,
    gap: 10,
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
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryText,
  },

  saveButtonWrapper: {
    width: '100%',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  loadingText: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 8,
  },
});