import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import Sizes from '../../../theme/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: Sizes.screenPadding,
  },

  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContainer: {
    paddingBottom: 20,
  },

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

  subtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  transactionDate: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginBottom: 2,
  },

  transactionDesc: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primaryText,
  },

  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 2,
  },

  paymentContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  paymentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.secondaryText,
    marginBottom: 6,
  },

  paymentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  paymentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: Sizes.borderRadius,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: Colors.primaryText,
    backgroundColor: '#FFFFFF',
  },

  payButton: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Sizes.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },

  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  noTransactions: {
    padding: 20,
    alignItems: 'center',
  },

  noTransactionsText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },

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

  paymentNote: {
    fontSize: 12,
    color: '#2E7D32',
    marginTop: 4,
    fontStyle: 'italic',
  },
});
