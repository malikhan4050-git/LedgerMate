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
    paddingTop: 15,
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

  // =============================================
  // FEATURE 1: Transaction Trends
  // =============================================

  sectionContainer: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 10,
  },

  trendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  trendItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  trendLabel: {
    fontSize: 11,
    color: Colors.secondaryText,
    fontWeight: '500',
  },

  trendValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 4,
  },

  // =============================================
  // FEATURE 2: Top Products
  // =============================================

  topProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 12,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  topProductRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E90FF',
    width: 30,
  },

  topProductName: {
    fontSize: 14,
    color: Colors.primaryText,
    flex: 1,
    fontWeight: '500',
  },

  topProductCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E90FF',
  },

  // =============================================
  // FEATURE 3: Quick Stats
  // =============================================

  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },

  quickStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  quickStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginTop: 4,
  },

  quickStatLabel: {
    fontSize: 10,
    color: Colors.secondaryText,
    marginTop: 2,
    textAlign: 'center',
  },

  // =============================================
  // FEATURE 4: Weekly Summary
  // =============================================

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    paddingVertical: 8,
  },

  weekDayItem: {
    flex: 1,
    alignItems: 'center',
  },

  weekBarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 50,
    gap: 2,
  },

  weekBar: {
    width: 12,
    borderRadius: 4,
    minHeight: 4,
  },

  weekDayLabel: {
    fontSize: 10,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  // =============================================
  // FEATURE 5: Top Customers
  // =============================================

  topCustomerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 12,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  topCustomerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  topCustomerRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E90FF',
    width: 30,
  },

  topCustomerName: {
    fontSize: 14,
    color: Colors.primaryText,
    fontWeight: '500',
    flex: 1,
  },

  topCustomerRight: {
    alignItems: 'flex-end',
  },

  topCustomerCount: {
    fontSize: 10,
    color: Colors.secondaryText,
  },

  topCustomerAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  // =============================================
  // Stats Row
  // =============================================

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  statLabel: {
    fontSize: 10,
    color: Colors.secondaryText,
    marginTop: 2,
    textAlign: 'center',
  },

  // =============================================
  // Profit/Loss Summary
  // =============================================

  profitLossContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  profitLossItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },

  profitLossDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 4,
  },

  profitLossTotal: {
    borderTopWidth: 2,
    borderTopColor: '#E8E8E8',
    paddingTop: 10,
    marginTop: 4,
  },

  profitLossLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primaryText,
  },

  profitLossValue: {
    fontSize: 14,
    fontWeight: '600',
  },

  profitLossSale: {
    color: '#2E7D32',
  },

  profitLossPurchase: {
    color: '#C62828',
  },

  profitLossTotalValue: {
    fontSize: 16,
  },

  // =============================================
  // Recent Transactions
  // =============================================

  recentSection: {
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
});