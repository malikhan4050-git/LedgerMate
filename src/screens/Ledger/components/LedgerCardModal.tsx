import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import GradientButton from '../../../components/Buttons/GradientButton';
import styles from './stylesModals';

interface LedgerCardModalProps {
  visible: boolean;
  entry: {
    _id: string;
    name: string;
    entryType: 'sale' | 'purchase';
    itemsDescription: string;
    manualTotalPrice: number;
    transactionDate: string;
    notes?: string;
    createdAt: string;
    products?: Array<{
      product: string;
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
    discount?: number;
    subtotal?: number;
    totalAmount?: number;
  } | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const LedgerCardModal = ({
  visible,
  entry,
  onClose,
  onEdit,
  onDelete,
}: LedgerCardModalProps) => {
  if (!entry) return null;

  const isSale = entry.entryType === 'sale';
  const isAdvanceUser = entry.products && entry.products.length > 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
      full: date.toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  const formatted = formatDate(entry.transactionDate);

  // Get display amount (use totalAmount for advance users, manualTotalPrice for simple users)
  const displayAmount = entry.totalAmount || entry.manualTotalPrice || 0;

  // Get display items (product names for advance users, itemsDescription for simple users)
  const displayItems = isAdvanceUser
    ? entry.products?.map(p => `${p.name} x${p.quantity}`).join(', ')
    : entry.itemsDescription;

  // Get product list for advance users (detailed view)
  const productList = entry.products || [];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalKeyboardContainer}
        behavior={Platform.OS === 'android' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Header */}
              <View style={styles.modalCardHeader}>
                <View
                  style={[
                    styles.modalCardBadge,
                    isSale
                      ? styles.modalCardBadgeSale
                      : styles.modalCardBadgePurchase,
                  ]}
                >
                  <Text
                    style={[
                      styles.modalCardBadgeText,
                      isSale
                        ? styles.modalCardBadgeTextSale
                        : styles.modalCardBadgeTextPurchase,
                    ]}
                  >
                    {isSale ? 'Sale' : 'Purchase'}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
                  <Icon name="close-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              {/* Title */}
              <Text style={styles.modalCardTitle}>Transaction Details</Text>

              {/* Customer/Supplier Name */}
              <View style={styles.modalCardRow}>
                <Text style={styles.modalCardLabel}>
                  {isSale ? 'Customer' : 'Supplier'}
                </Text>
                <Text style={styles.modalCardValue}>{entry.name}</Text>
              </View>

              {/* Type */}
              <View style={styles.modalCardRow}>
                <Text style={styles.modalCardLabel}>Type</Text>
                <Text style={styles.modalCardValue}>
                  {isSale ? 'Sale' : 'Purchase'}
                </Text>
              </View>

              {/* Items Display */}
              <View style={styles.modalCardRow}>
                <Text style={styles.modalCardLabel}>Items</Text>
                <Text style={styles.modalCardValue} numberOfLines={2}>
                  {displayItems}
                </Text>
              </View>

              {/* For Advance Users: Show Product Details with Quantity and Price */}
              {isAdvanceUser && productList.length > 0 && (
                <View style={styles.modalCardProductContainer}>
                  <Text style={styles.modalCardProductTitle}>Product Details</Text>
                  {productList.map((product, index) => (
                    <View key={index} style={styles.modalCardProductRow}>
                      <View style={styles.modalCardProductInfo}>
                        <Text style={styles.modalCardProductName}>
                          {product.name}
                        </Text>
                        <Text style={styles.modalCardProductQty}>
                          Qty: {product.quantity}
                        </Text>
                      </View>
                      <View style={styles.modalCardProductPrice}>
                        <Text style={styles.modalCardProductUnitPrice}>
                          @ PKR {product.price}
                        </Text>
                        <Text style={styles.modalCardProductTotal}>
                          PKR {product.total}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Subtotal (for Advance Users) */}
              {isAdvanceUser && entry.subtotal && (
                <View style={styles.modalCardRow}>
                  <Text style={styles.modalCardLabel}>Subtotal</Text>
                  <Text style={styles.modalCardValue}>
                    PKR {entry.subtotal}
                  </Text>
                </View>
              )}

              {/* Discount (if available) */}
              {entry.discount && entry.discount > 0 && (
                <View style={styles.modalCardRow}>
                  <Text style={styles.modalCardLabel}>Discount</Text>
                  <Text style={styles.modalCardValueDiscount}>
                    - PKR {entry.discount}
                  </Text>
                </View>
              )}

              {/* Total Amount (for Advance Users) */}
              {isAdvanceUser && entry.totalAmount && (
                <View style={styles.modalCardRowTotal}>
                  <Text style={styles.modalCardLabelTotal}>Total Amount</Text>
                  <Text
                    style={[
                      styles.modalCardValue,
                      isSale
                        ? styles.modalCardValueSale
                        : styles.modalCardValuePurchase,
                    ]}
                  >
                    PKR {entry.totalAmount}
                  </Text>
                </View>
              )}

              {/* Amount for Simple Users (manualTotalPrice) */}
              {!isAdvanceUser && (
                <View style={styles.modalCardRow}>
                  <Text style={styles.modalCardLabel}>Amount</Text>
                  <Text
                    style={[
                      styles.modalCardValue,
                      isSale
                        ? styles.modalCardValueSale
                        : styles.modalCardValuePurchase,
                    ]}
                  >
                    PKR {entry.manualTotalPrice}
                  </Text>
                </View>
              )}

              {/* Date & Time */}
              <View style={styles.modalCardRow}>
                <Text style={styles.modalCardLabel}>Date & Time</Text>
                <Text style={styles.modalCardValue}>{formatted.full}</Text>
              </View>

              {/* Notes (if exists) */}
              {entry.notes && (
                <View style={styles.modalCardRow}>
                  <Text style={styles.modalCardLabel}>Notes</Text>
                  <Text style={styles.modalCardValue}>{entry.notes}</Text>
                </View>
              )}

              {/* Record ID */}
              <View style={styles.modalCardRow}>
                <Text style={styles.modalCardLabel}>Record ID</Text>
                <Text style={styles.modalCardValueSmall}>{entry._id}</Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.modalCardActions}>
                <TouchableOpacity
                  style={styles.modalCardActionButton}
                  onPress={onEdit}
                >
                  <Icon name="pencil-outline" size={18} color="#1E90FF" />
                  <Text style={styles.modalCardActionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalCardActionButton, styles.modalCardActionDelete]}
                  onPress={onDelete}
                >
                  <Icon name="trash-outline" size={18} color="#FF3B30" />
                  <Text style={styles.modalCardActionTextDelete}>Delete</Text>
                </TouchableOpacity>
              </View>

              {/* Close Button */}
              <View style={styles.modalSaveButtonWrapper}>
                <GradientButton
                  title="Close"
                  titleStyle={styles.buttonText}
                  onPress={onClose}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default LedgerCardModal;