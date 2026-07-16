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

import GradientButton from '../../../components/Buttons/GradientButton';
import styles from './styles';

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (productData: {
    name: string;
    price: string;
    stock: string;
    category: string;
  }) => void;
}

// Helper function outside component
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const AddProductModal = ({
  visible,
  onClose,
  onSave,
}: AddProductModalProps) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });
  const [modalErrors, setModalErrors] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      price: '',
      stock: '',
      category: '',
    };

    if (!newProduct.name || newProduct.name.trim() === '') {
      newErrors.name = 'Please enter product name';
      isValid = false;
    }

    if (!newProduct.price || newProduct.price.trim() === '') {
      newErrors.price = 'Please enter price';
      isValid = false;
    } else if (
      isNaN(Number(newProduct.price)) ||
      Number(newProduct.price) <= 0
    ) {
      newErrors.price = 'Please enter a valid price';
      isValid = false;
    }

    if (!newProduct.stock || newProduct.stock.trim() === '') {
      newErrors.stock = 'Please enter stock quantity';
      isValid = false;
    } else if (
      isNaN(Number(newProduct.stock)) ||
      Number(newProduct.stock) < 0
    ) {
      newErrors.stock = 'Please enter a valid stock quantity';
      isValid = false;
    }

    if (!newProduct.category || newProduct.category.trim() === '') {
      newErrors.category = 'Please enter category';
      isValid = false;
    }

    setModalErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: '',
    });
    setModalErrors({
      name: '',
      price: '',
      stock: '',
      category: '',
    });
  };

  const handleModalSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await addProduct(newProduct);

      // Simulate API call
      await wait(1000);

      onSave(newProduct);
      resetForm();

      Alert.alert('Success', 'Product added successfully!');
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Error', message);
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
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleModalCancel}
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
              <Text style={styles.modalTitle}>Add New Product</Text>

              {/* Product Name */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Product Name *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.name && styles.inputError,
                  ]}
                  placeholder="Enter product name"
                  placeholderTextColor="#8E8E93"
                  value={newProduct.name}
                  editable={!loading}
                  onChangeText={(text) => {
                    setNewProduct({ ...newProduct, name: text });
                    if (modalErrors.name) {
                      setModalErrors((prev) => ({ ...prev, name: '' }));
                    }
                  }}
                />
                {modalErrors.name ? (
                  <Text style={styles.errorText}>{modalErrors.name}</Text>
                ) : null}
              </View>

              {/* Price */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Price *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.price && styles.inputError,
                  ]}
                  placeholder="Enter price"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={newProduct.price}
                  editable={!loading}
                  onChangeText={(text) => {
                    setNewProduct({ ...newProduct, price: text });
                    if (modalErrors.price) {
                      setModalErrors((prev) => ({ ...prev, price: '' }));
                    }
                  }}
                />
                {modalErrors.price ? (
                  <Text style={styles.errorText}>{modalErrors.price}</Text>
                ) : null}
              </View>

              {/* Stock */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Stock *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.stock && styles.inputError,
                  ]}
                  placeholder="Enter stock quantity"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={newProduct.stock}
                  editable={!loading}
                  onChangeText={(text) => {
                    setNewProduct({ ...newProduct, stock: text });
                    if (modalErrors.stock) {
                      setModalErrors((prev) => ({ ...prev, stock: '' }));
                    }
                  }}
                />
                {modalErrors.stock ? (
                  <Text style={styles.errorText}>{modalErrors.stock}</Text>
                ) : null}
              </View>

              {/* Category */}
              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Category *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.category && styles.inputError,
                  ]}
                  placeholder="Enter category"
                  placeholderTextColor="#8E8E93"
                  value={newProduct.category}
                  editable={!loading}
                  onChangeText={(text) => {
                    setNewProduct({ ...newProduct, category: text });
                    if (modalErrors.category) {
                      setModalErrors((prev) => ({ ...prev, category: '' }));
                    }
                  }}
                />
                {modalErrors.category ? (
                  <Text style={styles.errorText}>{modalErrors.category}</Text>
                ) : null}
              </View>

              {/* Modal Buttons */}
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

export default AddProductModal;