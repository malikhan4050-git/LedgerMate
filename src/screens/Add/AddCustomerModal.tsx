import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';

import GradientButton from '../../components/Buttons/GradientButton';
import { addCustomer } from '../../services/customerApi'; // adjust path as per your folder structure
import styles from './styles';

interface AddCustomerModalProps {
  visible: boolean;
  isSale: boolean;
  onClose: () => void;
  onSave: (customerData: {
    name: string;
    email: string;
    phoneNo: string;
    address: string;
  }) => void;
}

const AddCustomerModal = ({
  visible,
  isSale,
  onClose,
  onSave,
}: AddCustomerModalProps) => {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: '',
  });
  const [modalErrors, setModalErrors] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      phoneNo: '',
      address: '',
    };

    if (!newCustomer.name || newCustomer.name.trim() === '') {
      newErrors.name = 'Please enter name';
      isValid = false;
    }

    if (!newCustomer.email || newCustomer.email.trim() === '') {
      newErrors.email = 'Please enter email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(newCustomer.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!newCustomer.phoneNo || newCustomer.phoneNo.trim() === '') {
      newErrors.phoneNo = 'Please enter phone number';
      isValid = false;
    }

    if (!newCustomer.address || newCustomer.address.trim() === '') {
      newErrors.address = 'Please enter address';
      isValid = false;
    }

    setModalErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setNewCustomer({
      name: '',
      email: '',
      phoneNo: '',
      address: '',
    });
    setModalErrors({
      name: '',
      email: '',
      phoneNo: '',
      address: '',
    });
  };

  const handleModalSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Call API to add customer/supplier
      const response = await addCustomer(newCustomer);

      // Pass saved data back to parent (use API response if it returns the created object)
      onSave(response?.data ?? newCustomer);

      resetForm();

      Alert.alert(
        'Success',
        `${isSale ? 'Customer' : 'Supplier'} added successfully!`
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';

      // Show duplicate email error under email field if backend indicates that
      if (message.toLowerCase().includes('email')) {
        setModalErrors((prev) => ({ ...prev, email: message }));
      } else {
        Alert.alert('Error', message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleModalCancel}
    >
      <KeyboardAvoidingView
        style={styles.modalKeyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>
                {isSale ? 'Add New Customer' : 'Add New Supplier'}
              </Text>

              {/* Name */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Name *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.name && styles.inputError,
                  ]}
                  placeholder="Enter name"
                  placeholderTextColor="#8E8E93"
                  value={newCustomer.name}
                  editable={!loading}
                  onChangeText={text => {
                    setNewCustomer({ ...newCustomer, name: text });
                    if (modalErrors.name) {
                      setModalErrors(prev => ({ ...prev, name: '' }));
                    }
                  }}
                />
                {modalErrors.name ? (
                  <Text style={styles.errorText}>{modalErrors.name}</Text>
                ) : null}
              </View>

              {/* Email */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Email *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.email && styles.inputError,
                  ]}
                  placeholder="Enter email"
                  placeholderTextColor="#8E8E93"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={newCustomer.email}
                  editable={!loading}
                  onChangeText={text => {
                    setNewCustomer({ ...newCustomer, email: text });
                    if (modalErrors.email) {
                      setModalErrors(prev => ({ ...prev, email: '' }));
                    }
                  }}
                />
                {modalErrors.email ? (
                  <Text style={styles.errorText}>{modalErrors.email}</Text>
                ) : null}
              </View>

              {/* Phone No */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Phone No *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.phoneNo && styles.inputError,
                  ]}
                  placeholder="Enter phone number"
                  placeholderTextColor="#8E8E93"
                  keyboardType="phone-pad"
                  value={newCustomer.phoneNo}
                  editable={!loading}
                  onChangeText={text => {
                    setNewCustomer({ ...newCustomer, phoneNo: text });
                    if (modalErrors.phoneNo) {
                      setModalErrors(prev => ({ ...prev, phoneNo: '' }));
                    }
                  }}
                />
                {modalErrors.phoneNo ? (
                  <Text style={styles.errorText}>{modalErrors.phoneNo}</Text>
                ) : null}
              </View>

              {/* Address */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Address *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.address && styles.inputError,
                  ]}
                  placeholder="Enter address"
                  placeholderTextColor="#8E8E93"
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                  value={newCustomer.address}
                  editable={!loading}
                  onChangeText={text => {
                    setNewCustomer({ ...newCustomer, address: text });
                    if (modalErrors.address) {
                      setModalErrors(prev => ({ ...prev, address: '' }));
                    }
                  }}
                />
                {modalErrors.address ? (
                  <Text style={styles.errorText}>{modalErrors.address}</Text>
                ) : null}
              </View>

              {/* Modal Buttons - Stacked Vertically */}
              <View style={styles.modalSaveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Save"
                    titleStyle={styles.buttonText}
                    onPress={handleModalSave}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleModalCancel}
                disabled={loading}
              >
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddCustomerModal;