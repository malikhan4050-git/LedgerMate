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
    flexGrow: 1,
    paddingBottom: 20,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
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

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
    padding: 0,
  },

  customerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  customerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
  },

  customerTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  customerMeta: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 4,
  },

  emptySubtext: {
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

  // ---- Detail View Styles ----
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  detailName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  detailTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
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

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },

  backButtonText: {
    fontSize: 16,
    color: '#1E90FF',
    marginLeft: 4,
  },

  noTransactions: {
    padding: 20,
    alignItems: 'center',
  },

  noTransactionsText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
});