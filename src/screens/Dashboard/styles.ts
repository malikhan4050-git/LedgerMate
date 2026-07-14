import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: Sizes.screenPadding,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
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

  subtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },

  loadingText: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 8,
  },

  // Greeting
  greeting: {
    paddingTop : 15,
    fontSize: 14,
    color: Colors.secondaryText,
  },

  // Summary Cards Row
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  salesCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },

  purchaseCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#C62828',
  },

  summaryIconContainer: {
    marginBottom: 6,
  },

  summaryLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '500',
  },

  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginTop: 2,
  },

  // Balance Card
  balanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  balanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
  },

  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  positive: {
    color: '#2E7D32',
  },

  negative: {
    color: '#C62828',
  },

  // Recent Transactions
  recentSection: {
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  seeAllText: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '500',
  },

  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  recentBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  recentBadgeSale: {
    backgroundColor: '#E8F5E9',
  },

  recentBadgePurchase: {
    backgroundColor: '#FFEBEE',
  },

  recentBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  recentBadgeTextSale: {
    color: '#2E7D32',
  },

  recentBadgeTextPurchase: {
    color: '#C62828',
  },

  recentItemName: {
    fontSize: 14,
    color: Colors.primaryText,
    fontWeight: '500',
  },

  recentItemDate: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 1,
  },

  recentItemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  recentItemAmountSale: {
    color: '#2E7D32',
  },

  recentItemAmountPurchase: {
    color: '#C62828',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginTop: 8,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 2,
  },

  // Add Button
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: Sizes.borderRadius,
    paddingVertical: 14,
    gap: 8,
    shadowColor: '#1E90FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  footerSpacing: {
    height: 20,
  },
});