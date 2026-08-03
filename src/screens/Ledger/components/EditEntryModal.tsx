import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { EntryPayload } from '../../../services/entryApi';
import { useAlert } from '../../../hooks/useAlert';
import api from '../../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './stylesEditEntryModal';

interface EditEntryModalProps {
  visible: boolean;
  entry: any;
  onClose: () => void;
  onSave: (updatedData: Partial<EntryPayload>) => Promise<any>;
  onRefresh?: () => void;
}

interface ProductItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  unit?: string;
}

const EditEntryModal: React.FC<EditEntryModalProps> = ({
  visible,
  entry,
  onClose,
  onSave,
  onRefresh,
}) => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState<Partial<EntryPayload>>({});
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isAdvanceUser, setIsAdvanceUser] = useState(false);
  const [originalProducts, setOriginalProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (entry) {
      if (entry.products && entry.products.length > 0) {
        setIsAdvanceUser(true);
        const mappedProducts = entry.products.map((p: any) => ({
          ...p,
          total: p.price * p.quantity,
        }));
        setProducts(mappedProducts);
        setOriginalProducts(JSON.parse(JSON.stringify(mappedProducts)));
        setFormData({
          entryType: entry.entryType,
          notes: entry.notes || '',
          transactionDate: entry.transactionDate,
          customer: entry.customer?._id || entry.customer,
          supplier: entry.supplier?._id || entry.supplier,
          discount: entry.discount || 0,
        });
      } else {
        setIsAdvanceUser(false);
        setFormData({
          entryType: entry.entryType,
          itemsDescription: entry.itemsDescription,
          manualTotalPrice: entry.manualTotalPrice,
          notes: entry.notes || '',
          transactionDate: entry.transactionDate,
          customer: entry.customer?._id || entry.customer,
          supplier: entry.supplier?._id || entry.supplier,
        });
        setProducts([]);
        setOriginalProducts([]);
      }
    }
  }, [entry]);

  const updateProductStock = async (productId: string, newStock: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.put(
        `/product/${productId}`,
        { stock: newStock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  };

  const getCurrentStock = async (productId: string): Promise<number> => {
    const token = await AsyncStorage.getItem('token');
    const response = await api.get(`/product/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data?.product?.stock || 0;
  };

  const calculateStockChanges = () => {
    const changes: { productId: string; quantityDiff: number }[] = [];
    const isSale = formData.entryType === 'sale';

    originalProducts.forEach((orig) => {
      const updated = products.find(p => p.product === orig.product);
      if (updated) {
        const diff = updated.quantity - orig.quantity;
        if (diff !== 0) {
          const stockChange = isSale ? -diff : diff;
          changes.push({ productId: orig.product, quantityDiff: stockChange });
        }
      } else {
        const stockChange = isSale ? orig.quantity : -orig.quantity;
        changes.push({ productId: orig.product, quantityDiff: stockChange });
      }
    });

    products.forEach((updated) => {
      const original = originalProducts.find(p => p.product === updated.product);
      if (!original) {
        const stockChange = isSale ? -updated.quantity : updated.quantity;
        changes.push({ productId: updated.product, quantityDiff: stockChange });
      }
    });

    return changes;
  };

  const handleProductQuantityChange = (index: number, change: number) => {
    const updated = [...products];
    const newQuantity = updated[index].quantity + change;
    if (newQuantity >= 1) {
      updated[index].quantity = newQuantity;
      updated[index].total = updated[index].price * newQuantity;
      setProducts(updated);
    }
  };

  const handleProductRemove = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleProductPriceChange = (index: number, text: string) => {
    const updated = [...products];
    const price = parseFloat(text);
    if (!isNaN(price) && price >= 0) {
      updated[index].price = price;
      updated[index].total = price * updated[index].quantity;
      setProducts(updated);
    }
  };

  const calculateFinalTotal = () => {
    const grandTotal = products.reduce((sum, p) => sum + p.total, 0);
    return grandTotal - (formData.discount || 0);
  };

  const handleSave = async () => {
    if (isAdvanceUser) {
      if (products.length === 0) {
        showAlert('Error', 'Please add at least one product.', 'error');
        return;
      }
      
      const finalTotal = calculateFinalTotal();
      const payload: any = {
        entryType: formData.entryType,
        products: products.map(p => ({
          product: p.product,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
          total: p.total,
        })),
        manualTotalPrice: finalTotal,
        transactionDate: formData.transactionDate,
        notes: formData.notes || '',
        discount: formData.discount || 0,
      };

      if (formData.entryType === 'sale') {
        payload.customer = formData.customer;
      } else {
        payload.supplier = formData.supplier;
      }

      setIsSaving(true);
      try {
        // Calculate and apply stock changes
        const stockChanges = calculateStockChanges();
        for (const change of stockChanges) {
          const currentStock = await getCurrentStock(change.productId);
          const newStock = currentStock + change.quantityDiff;
          if (newStock < 0) {
            showAlert('Error', 'Insufficient stock available for one or more products.', 'error');
            setIsSaving(false);
            return;
          }
          await updateProductStock(change.productId, newStock);
        }

        const updatedEntry = await onSave(payload);
        console.log('Updated entry from API:', updatedEntry);
        
        if (onRefresh) {
          onRefresh();
        }
        onClose();
      } catch (error) {
        showAlert('Error', 'Failed to update entry. Please try again.', 'error');
      } finally {
        setIsSaving(false);
      }
      return;
    }

    if (!formData.itemsDescription?.trim()) {
      showAlert('Error', 'Please enter items description.', 'error');
      return;
    }
    if (!formData.manualTotalPrice || formData.manualTotalPrice <= 0) {
      showAlert('Error', 'Please enter a valid amount.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const updatedEntry = await onSave(formData);
      console.log('Updated entry:', updatedEntry);
      
      if (onRefresh) {
        onRefresh();
      }
      onClose();
    } catch (error) {
      showAlert('Error', 'Failed to update entry. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const renderProductItem = ({ item, index }: { item: ProductItem; index: number }) => (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <Text style={styles.productName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleProductRemove(index)}>
          <Icon name="close-circle" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      <View style={styles.productBody}>
        <View style={styles.productQuantity}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => handleProductQuantityChange(index, -1)}
          >
            <Icon name="remove" size={16} color="#1E90FF" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => handleProductQuantityChange(index, 1)}
          >
            <Icon name="add" size={16} color="#1E90FF" />
          </TouchableOpacity>
          <Text style={styles.unitText}>{item.unit || 'unit'}</Text>
        </View>
        <View style={styles.productPriceInput}>
          <Text style={styles.priceLabel}>PKR</Text>
          <TextInput
            style={styles.priceInput}
            value={String(item.price)}
            onChangeText={(text) => handleProductPriceChange(index, text)}
            keyboardType="numeric"
            placeholder="0"
          />
        </View>
        <Text style={styles.productTotal}>PKR {item.total}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.modalTitle}>Edit Transaction</Text>

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

              {isAdvanceUser ? (
                <>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Products</Text>
                    {products.length > 0 ? (
                      <FlatList
                        data={products}
                        keyExtractor={(item, index) => `${item.product}-${index}`}
                        renderItem={renderProductItem}
                        scrollEnabled={false}
                      />
                    ) : (
                      <Text style={styles.emptyText}>No products added</Text>
                    )}
                  </View>

                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Discount (PKR)</Text>
                    <TextInput
                      style={styles.input}
                      value={String(formData.discount || 0)}
                      onChangeText={(text) => {
                        const num = parseFloat(text);
                        setFormData({ ...formData, discount: isNaN(num) ? 0 : num });
                      }}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>

                  <View style={[styles.totalContainer, styles.finalTotalContainer]}>
                    <Text style={styles.totalLabel}>Final Total</Text>
                    <Text style={styles.finalTotalValue}>
                      PKR {calculateFinalTotal()}
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.label}>Items Description</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.itemsDescription}
                      onChangeText={(text) =>
                        setFormData({ ...formData, itemsDescription: text })
                      }
                      placeholder="e.g. 2kg Rice, 5L Oil"
                      multiline
                    />
                  </View>

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
                </>
              )}

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

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={isSaving}>
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

              {isSaving && (
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color="#4A90E2" />
                  <Text style={styles.loadingText}>Updating...</Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditEntryModal;