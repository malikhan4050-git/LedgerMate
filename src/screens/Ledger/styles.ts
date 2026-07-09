import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.screenPadding,
  },

  keyboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Header
  header: {
    marginTop: 10,
    marginBottom: 20,
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

  // Filter Toggle
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: Sizes.borderRadius,
    padding: 4,
    marginBottom: 16,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Sizes.borderRadius - 4,
    alignItems: 'center',
  },

  filterButtonActive: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.secondaryText,
  },

  filterButtonTextActive: {
    color: Colors.primaryText,
    fontWeight: '600',
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: Sizes.borderRadius,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
    padding: 0,
  },

  // Card
  card: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    flex: 1,
  },

  cardBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
  },

  cardBadgePurchase: {
    backgroundColor: '#FFEBEE',
  },

  cardBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2E7D32',
  },

  cardBadgeTextPurchase: {
    color: '#C62828',
  },

  cardBody: {
    marginBottom: 8,
  },

  cardItems: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 4,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },

  cardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  cardAmountPurchase: {
    color: '#C62828',
  },

  cardDate: {
    fontSize: 12,
    color: Colors.secondaryText,
  },

  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    padding: 8,
    marginLeft: 4,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyIcon: {
    marginBottom: 16,
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

  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  errorText: {
    fontSize: 14,
    color: '#C62828',
    textAlign: 'center',
    marginBottom: 12,
  },

  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1E90FF',
    borderRadius: Sizes.borderRadius,
  },

  retryButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
});