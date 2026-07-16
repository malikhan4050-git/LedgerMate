import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import Sizes from '../../../theme/Sizes';

export default StyleSheet.create({// ========== LedgerCardModal Styles ==========

modalCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},

modalCardBadge: {
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
},

modalCardBadgeSale: {
  backgroundColor: '#E8F5E9',
},

modalCardBadgePurchase: {
  backgroundColor: '#FFEBEE',
},

modalCardBadgeText: {
  fontSize: 12,
  fontWeight: '600',
  textTransform: 'uppercase',
},

modalCardBadgeTextSale: {
  color: '#2E7D32',
},

modalCardBadgeTextPurchase: {
  color: '#C62828',
},

modalCloseButton: {
  padding: 4,
},

modalCardTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: Colors.primaryText,
  marginBottom: 16,
  textAlign: 'center',
},

modalCardRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingVertical: 8,
  borderBottomWidth: 0.5,
  borderBottomColor: '#F0F0F0',
},

modalCardLabel: {
  fontSize: 14,
  fontWeight: '600',
  color: Colors.secondaryText,
  width: '35%',
},

modalCardValue: {
  fontSize: 14,
  fontWeight: '500',
  color: Colors.primaryText,
  width: '60%',
  textAlign: 'right',
},

modalCardValueSale: {
  color: '#2E7D32',
},

modalCardValuePurchase: {
  color: '#C62828',
},

modalCardValueSmall: {
  fontSize: 12,
  fontWeight: '400',
  color: '#8E8E93',
  width: '60%',
  textAlign: 'right',
},

modalCardDivider: {
  height: 1,
  backgroundColor: '#E8E8E8',
  marginVertical: 12,
},

modalCardActions: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 16,
  marginBottom: 16,
},

modalCardActionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  backgroundColor: '#F5F5F5',
  gap: 6,
},

modalCardActionDelete: {
  backgroundColor: '#FFF5F5',
},

modalCardActionText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#1E90FF',
},

modalCardActionTextDelete: {
  fontSize: 14,
  fontWeight: '500',
  color: '#FF3B30',
},

// ========== Missing Styles ==========

buttonText: {
  fontSize: 14,
  fontWeight: '600',
},

modalSaveButtonWrapper: {
  width: '100%',
  marginTop: 10,
},

modalKeyboardContainer: {
  flex: 1,
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
})