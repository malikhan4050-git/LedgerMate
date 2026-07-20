import React, { useState, useEffect } from 'react';
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
import { updateProduct } from '../../../services/productsApi';
import styles from './styles';

interface EditProductModalProps {
  visible: boolean;
  product: {
    _id?: string;
    id?: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    unit?: string;
  } | null;
  onClose: () => void;
  onSave: () => void;
}

const EditProductModal = ({
  visible,
  product,
  onClose,
  onSave,
}: EditProductModalProps) => {
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    unit: '',
  });
  const [modalErrors, setModalErrors] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    unit: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || '',
        price: String(product.price || ''),
        stock: String(product.stock || ''),
        category: product.category || '',
        unit: product.unit || '',
      });
    }
  }, [product]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      price: '',
      stock: '',
      category: '',
      unit: '',
    };

    if (!editedProduct.name || editedProduct.name.trim() === '') {
      newErrors.name = 'Please enter product name';
      isValid = false;
    }

    if (!editedProduct.price || editedProduct.price.trim() === '') {
      newErrors.price = 'Please enter price';
      isValid = false;
    } else if (
      isNaN(Number(editedProduct.price)) ||
      Number(editedProduct.price) <= 0
    ) {
      newErrors.price = 'Please enter a valid price';
      isValid = false;
    }

    if (!editedProduct.stock || editedProduct.stock.trim() === '') {
      newErrors.stock = 'Please enter stock quantity';
      isValid = false;
    } else if (
      isNaN(Number(editedProduct.stock)) ||
      Number(editedProduct.stock) < 0
    ) {
      newErrors.stock = 'Please enter a valid stock quantity';
      isValid = false;
    }

    if (!editedProduct.category || editedProduct.category.trim() === '') {
      newErrors.category = 'Please enter category';
      isValid = false;
    }

    if (!editedProduct.unit || editedProduct.unit.trim() === '') {
      newErrors.unit = 'Please enter unit';
      isValid = false;
    }

    setModalErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setEditedProduct({
      name: '',
      price: '',
      stock: '',
      category: '',
      unit: '',
    });
    setModalErrors({
      name: '',
      price: '',
      stock: '',
      category: '',
      unit: '',
    });
  };

  const handleModalSave = async () => {
    if (!validateForm()) {
      return;
    }

    if (!product) return;

    setLoading(true);
    try {
      const productId = product._id || product.id;
      if (!productId) {
        Alert.alert('Error', 'Product ID not found');
        return;
      }

      const payload = {
        name: editedProduct.name.trim(),
        price: parseFloat(editedProduct.price),
        stock: parseInt(editedProduct.stock, 10),
        category: editedProduct.category.trim(),
        unit: editedProduct.unit.trim(),
      };

      await updateProduct(productId, payload);
      onSave();
      resetForm();
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
      animationType="slide"
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
              <Text style={styles.modalTitle}>Edit Product</Text>

              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Product Name *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.name && styles.inputError,
                  ]}
                  placeholder="Enter product name"
                  placeholderTextColor="#8E8E93"
                  value={editedProduct.name}
                  editable={!loading}
                  onChangeText={(text) => {
                    setEditedProduct({ ...editedProduct, name: text });
                    if (modalErrors.name) {
                      setModalErrors((prev) => ({ ...prev, name: '' }));
                    }
                  }}
                />
                {modalErrors.name ? (
                  <Text style={styles.errorText}>{modalErrors.name}</Text>
                ) : null}
              </View>

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
                  value={editedProduct.price}
                  editable={!loading}
                  onChangeText={(text) => {
                    setEditedProduct({ ...editedProduct, price: text });
                    if (modalErrors.price) {
                      setModalErrors((prev) => ({ ...prev, price: '' }));
                    }
                  }}
                />
                {modalErrors.price ? (
                  <Text style={styles.errorText}>{modalErrors.price}</Text>
                ) : null}
              </View>

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
                  value={editedProduct.stock}
                  editable={!loading}
                  onChangeText={(text) => {
                    setEditedProduct({ ...editedProduct, stock: text });
                    if (modalErrors.stock) {
                      setModalErrors((prev) => ({ ...prev, stock: '' }));
                    }
                  }}
                />
                {modalErrors.stock ? (
                  <Text style={styles.errorText}>{modalErrors.stock}</Text>
                ) : null}
              </View>

              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Category *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.category && styles.inputError,
                  ]}
                  placeholder="Enter category"
                  placeholderTextColor="#8E8E93"
                  value={editedProduct.category}
                  editable={!loading}
                  onChangeText={(text) => {
                    setEditedProduct({ ...editedProduct, category: text });
                    if (modalErrors.category) {
                      setModalErrors((prev) => ({ ...prev, category: '' }));
                    }
                  }}
                />
                {modalErrors.category ? (
                  <Text style={styles.errorText}>{modalErrors.category}</Text>
                ) : null}
              </View>

              <View style={styles.modalFieldContainer}>
                <Text style={styles.modalLabel}>Unit *</Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    modalErrors.unit && styles.inputError,
                  ]}
                  placeholder="e.g. kg, liter, dozen, piece"
                  placeholderTextColor="#8E8E93"
                  value={editedProduct.unit}
                  editable={!loading}
                  onChangeText={(text) => {
                    setEditedProduct({ ...editedProduct, unit: text });
                    if (modalErrors.unit) {
                      setModalErrors((prev) => ({ ...prev, unit: '' }));
                    }
                  }}
                />
                {modalErrors.unit ? (
                  <Text style={styles.errorText}>{modalErrors.unit}</Text>
                ) : null}
              </View>

              <View style={styles.modalSaveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Update"
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

export default EditProductModal;