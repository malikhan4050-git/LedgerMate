import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

interface DeleteProductModalProps {
  visible: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}

const DeleteProductModal = ({
  visible,
  productName,
  onClose,
  onConfirm,
  isDeleting = false,
}: DeleteProductModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.deleteModalHeader}>
            <Icon name="trash-outline" size={40} color="#FF3B30" />
          </View>

          <Text style={styles.deleteModalTitle}>Delete Product</Text>
          <Text style={styles.deleteModalMessage}>
            Are you sure you want to delete "{productName}"?
          </Text>
          <Text style={styles.deleteModalSubtext}>
            This action cannot be undone.
          </Text>

          <View style={styles.deleteModalButtonRow}>
            <TouchableOpacity
              style={styles.deleteModalCancelButton}
              onPress={onClose}
              disabled={isDeleting}
            >
              <Text style={styles.deleteModalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deleteModalConfirmButton,
                isDeleting && styles.deleteModalConfirmButtonDisabled,
              ]}
              onPress={onConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.deleteModalConfirmButtonText}>Delete</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteProductModal;