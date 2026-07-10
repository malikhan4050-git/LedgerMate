import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { EntryPayload } from '../../../services/entryApi';

interface EditEntryModalProps {
  visible: boolean;
  entry: any; // The full entry object
  onClose: () => void;
  onSave: (updatedData: Partial<EntryPayload>) => Promise<void>;
}

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  visible,
  entry,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<EntryPayload>>({});
  const [isSaving, setIsSaving] = useState(false);

  // When entry changes, pre-fill the form
  useEffect(() => {
    if (entry) {
      setFormData({
        entryType: entry.entryType,
        itemsDescription: entry.itemsDescription,
        manualTotalPrice: entry.manualTotalPrice,
        notes: entry.notes || '',
        transactionDate: entry.transactionDate,
        customer: entry.customer?._id || entry.customer,
        supplier: entry.supplier?._id || entry.supplier,
      });
    }
  }, [entry]);

  const handleSave = async () => {
    if (!formData.itemsDescription?.trim()) {
      Alert.alert('Error', 'Please enter items description.');
      return;
    }
    if (!formData.manualTotalPrice || formData.manualTotalPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to update entry. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Transaction</Text>

          {/* Type selector (simple: just show as text for now) */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Type</Text>
            <View style={styles.typeRow}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  formData.entryType === 'sale' && styles.typeButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, entryType: 'sale' })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    formData.entryType === 'sale' && styles.typeButtonTextActive,
                  ]}
                >
                  Sale
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  formData.entryType === 'purchase' && styles.typeButtonActive,
                ]}
                onPress={() => setFormData({ ...formData, entryType: 'purchase' })}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    formData.entryType === 'purchase' && styles.typeButtonTextActive,
                  ]}
                >
                  Purchase
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Items description */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Items Description</Text>
            <TextInput
              style={styles.input}
              value={formData.itemsDescription}
              onChangeText={(text) => setFormData({ ...formData, itemsDescription: text })}
              placeholder="e.g. 2kg Rice, 5L Oil"
              multiline
            />
          </View>

          {/* Amount */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Amount (PKR)</Text>
            <TextInput
              style={styles.input}
              value={String(formData.manualTotalPrice || '')}
              onChangeText={(text) => {
                const num = parseFloat(text);
                setFormData({ ...formData, manualTotalPrice: isNaN(num) ? 0 : num });
              }}
              keyboardType="numeric"
              placeholder="0"
            />
          </View>

          {/* Notes */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Notes (optional)</Text>
            <TextInput
              style={styles.input}
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              placeholder="Any additional info..."
              multiline
            />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
            >
              <Text style={styles.saveButtonText}>
                {isSaving ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Styles (you can move these to your styles file later)
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
  },
  typeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  typeButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#A0C4F0',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default EditEntryModal;