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

              {/* Items Description */}
              <View style={styles.modalCardRow}>
                <Text style={styles.modalCardLabel}>Items</Text>
                <Text style={styles.modalCardValue}>{entry.itemsDescription}</Text>
              </View>

              {/* Amount */}
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