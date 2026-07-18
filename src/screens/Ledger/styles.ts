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

  filterIconContainer: {
    padding: 4,
    marginLeft: 4,
  },

  dateGroup: {
    marginBottom: 16,
  },

  dateHeader: {
    paddingVertical: 6,
    marginBottom: 10,
  },

  dateHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  columnHeaders: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginBottom: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
  },

  columnHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.secondaryText,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  columnDetails: {
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 4,
  },

  columnAmount: {
    minWidth: 70,
    paddingHorizontal: 4,
    flexShrink: 0,
  },

  columnName: {
    minWidth: 55,
    paddingHorizontal: 4,
    flexShrink: 0,
  },

  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
    minHeight: 44,
  },

  cardCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardItems: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryText,
    textAlign: 'center',
  },

  cardNotes: {
    fontSize: 10,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 1,
  },

  cardName: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '500',
    textAlign: 'center',
  },

  cardAmount: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cardAmountSale: {
    color: '#2E7D32',
  },

  cardAmountPurchase: {
    color: '#C62828',
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

  loadingMoreContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  loadingMoreText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },

  footer: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
});