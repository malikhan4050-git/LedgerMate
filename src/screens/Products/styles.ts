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

  // Locked State Styles
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  lockedIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  lockedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 8,
  },

  lockedDescription: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },

  upgradeButtonWrapper: {
    width: '100%',
    maxWidth: 280,
  },

  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

  // Add Product Button
  addButtonWrapper: {
    marginBottom: 16,
  },

  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
    marginTop: 8,
  },

  emptySubtext: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginTop: 4,
  },

  // Footer
  footer: {
    marginTop: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },

  // Product Card Styles
  productCard: {
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

  productCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  productIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  productInfo: {
    flex: 1,
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
  },

  productCategory: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 1,
  },

  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    padding: 6,
    marginLeft: 4,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },

  productCardBody: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },

  productDetail: {
    flex: 1,
  },

  productDetailLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
  },

  productDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginTop: 2,
  },

  productDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },

  lowStock: {
    color: '#FF3B30',
  },

  inStock: {
    color: '#2E7D32',
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
  // Add these styles to your Products/styles.ts

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
});
