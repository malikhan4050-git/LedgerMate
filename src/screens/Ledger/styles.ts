import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

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

  // Header
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

  // Search Bar
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

  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },

  cardBadge: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
  },

  cardBadgeSale: {
    backgroundColor: '#E8F5E9',
  },

  cardBadgePurchase: {
    backgroundColor: '#FFEBEE',
  },

  cardBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  cardBadgeTextSale: {
    color: '#2E7D32',
  },

  cardBadgeTextPurchase: {
    color: '#C62828',
  },

  cardBody: {
    marginBottom: 12,
  },

  cardAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  cardAmountSale: {
    color: '#2E7D32',
  },

  cardAmountPurchase: {
    color: '#C62828',
  },

  cardItems: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 4,
  },

  cardNotesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  cardNotes: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    flex: 1,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },

  cardFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginRight: 6,
  },

  cardTime: {
    fontSize: 12,
    color: '#8E8E93',
  },

  cardFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%',
  },

  cardName: {
    fontSize: 12,
    color: '#555555',
    marginLeft: 4,
    fontWeight: '500',
  },

  // Empty State
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
  filterIconContainer: {
  padding: 4,
  marginLeft: 4,
},

// Filter Modal Styles
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalContent: {
  backgroundColor: '#FFFFFF',
  borderRadius: Sizes.borderRadius,
  padding: 20,
  width: '85%',
  maxWidth: 320,
},

modalHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  paddingBottom: 12,
  borderBottomWidth: 1,
  borderBottomColor: '#F0F0F0',
},

modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: Colors.primaryText,
},

filterOption: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 14,
  paddingHorizontal: 12,
  borderRadius: Sizes.borderRadius,
  marginBottom: 4,
},

filterOptionActive: {
  backgroundColor: '#F0F8FF',
},

filterOptionLeft: {
  flexDirection: 'row',
  alignItems: 'center',
},

filterOptionText: {
  fontSize: 16,
  color: '#555',
  marginLeft: 12,
},

filterOptionTextActive: {
  color: '#1E90FF',
  fontWeight: '600',
},
});