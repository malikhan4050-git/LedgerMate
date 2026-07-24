import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: Sizes.screenPadding,
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

  // User Card
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  userAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 4,
  },

  userDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  userDetail: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 6,
  },

  planBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },

  advanceBadge: {
    backgroundColor: '#E8F5E9',
  },

  simpleBadge: {
    backgroundColor: '#FFF3E0',
  },

  planText: {
    fontSize: 11,
    fontWeight: '600',
  },

  advanceText: {
    color: '#2E7D32',
  },

  simpleText: {
    color: '#F57C00',
  },

  // Sections
  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 14,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  logoutItem: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFEBEE',
  },

  disabledItem: {
    opacity: 0.6,
  },

  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  logoutIconContainer: {
    backgroundColor: '#FFEBEE',
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.primaryText,
  },

  logoutTitle: {
    color: '#FF3B30',
  },

  menuSubtitle: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 1,
  },

  logoutSubtitle: {
    color: '#FF9A95',
  },

  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },

  menuRightText: {
    fontSize: 13,
    color: '#8E8E93',
    marginRight: 4,
  },

  logoutRightText: {
    color: '#FF3B30',
  },

  footerSpacing: {
    height: 20,
  },
});