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
    paddingTop: 10,
    paddingBottom: 40,
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
});