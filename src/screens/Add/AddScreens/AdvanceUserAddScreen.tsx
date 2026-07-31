import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import ToggleSelector from '../../../components/Toggle/ToggleSelector';
import GradientButton from '../../../components/Buttons/GradientButton';
import AddCustomerModal from '../AddModal/AddCustomerModal';
import { useAlert } from '../../../hooks/useAlert';
import styles from '../stylesAddScreens/stylesAdvanceUser';
import { searchCustomers, CustomerResult } from '../../../services/customerApi';
import { searchSuppliers, SupplierResult } from '../../../services/supplierApi';
import { createEntry } from '../../../services/entryApi';
import { getProducts, ProductResult } from '../../../services/productsApi';

interface Party {
  id: string;
  name: string;
  email?: string;
  phoneNo?: string;
  address?: string;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

const AdvanceUserAddScreen = () => {
  const { showAlert } = useAlert();
  const isFocused = useIsFocused();
  const [mode, setMode] = useState<'sale' | 'purchase'>('sale');
  const isSale = mode === 'sale';

  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isManuallySet, setIsManuallySet] = useState(false);
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState('');

  // Product selection states
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    [],
  );
  const [productSearchText, setProductSearchText] = useState('');
  const [productSearchResults, setProductSearchResults] = useState<
    ProductResult[]
  >([]);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [allProducts, setAllProducts] = useState<ProductResult[]>([]);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [selectedProductForAdd, setSelectedProductForAdd] =
    useState<ProductResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [errors, setErrors] = useState({
    customer: '',
    purchasedItems: '',
    manualTotal: '',
  });

  const [searchResults, setSearchResults] = useState<Party[]>([]);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate grand total
  const grandTotal = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Fetch products on mount
  useEffect(() => {
    if (isFocused) {
      fetchAllProducts();
    }
  }, [isFocused]);

  const fetchAllProducts = async () => {
    try {
      const response = await getProducts(1, 100);
      console.log('Products fetched:', response.products?.length);
      setAllProducts(response.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Filter products based on search
  useEffect(() => {
    if (productSearchText.trim() === '') {
      setProductSearchResults([]);
      setShowProductDropdown(false);
      setSelectedProductForAdd(null);
      return;
    }

    const filtered = allProducts.filter(
      product =>
        product.name.toLowerCase().includes(productSearchText.toLowerCase()) ||
        (product.category &&
          product.category
            .toLowerCase()
            .includes(productSearchText.toLowerCase())),
    );
    setProductSearchResults(filtered);
    setShowProductDropdown(true);
  }, [productSearchText, allProducts]);

  const mapCustomerResult = (item: CustomerResult): Party => ({
    id: item.id || item._id || item.name,
    name: item.name,
    email: item.email,
    phoneNo: item.phoneNo,
    address: item.address,
  });

  const mapSupplierResult = (item: SupplierResult): Party => ({
    id: item.id || item._id || item.name,
    name: item.name,
    email: item.email,
    phoneNo: item.phoneNo,
    address: item.address,
  });

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (searchText.trim() === '') {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        let results;
        if (isSale) {
          const customerResults = await searchCustomers(searchText.trim());
          results = customerResults.map(mapCustomerResult);
        } else {
          const supplierResults = await searchSuppliers(searchText.trim());
          results = supplierResults.map(mapSupplierResult);
        }
        setSearchResults(results);
      } catch (error: any) {
        console.log(
          'Search failed:',
          error?.response?.status,
          error?.response?.data,
        );
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchText, mode, isSale]);

  useEffect(() => {
    if (!isManuallySet) {
      const interval = setInterval(() => {
        const now = new Date();
        setSelectedDate(now);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isManuallySet]);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentTime = new Date(selectedDate);
      const newDate = new Date(selectedDate);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());
      setSelectedDate(newDate);
      setIsManuallySet(true);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setSelectedDate(newDate);
      setIsManuallySet(true);
    }
  };

  const handleSelect = (item: Party) => {
    setSelectedItem(item.name);
    setSelectedPartyId(item.id);
    setSearchText(item.name);
    setShowDropdown(false);
    setErrors(prev => ({ ...prev, customer: '' }));
  };

  // Product selection handlers
  const handleSelectProduct = (product: ProductResult) => {
    setSelectedProductForAdd(product);
    setProductSearchText(product.name);
    setShowProductDropdown(false);
  };

  const handleAddProductToList = () => {
    if (!selectedProductForAdd) {
      showAlert('Warning', 'Please select a product first', 'warning');
      return;
    }

    const existingIndex = selectedProducts.findIndex(
      p => p.id === selectedProductForAdd.id,
    );

    if (existingIndex !== -1) {
      // Update quantity of existing product
      const updated = [...selectedProducts];
      updated[existingIndex].quantity += currentQuantity;
      setSelectedProducts(updated);
    } else {
      // Add new product with selected quantity
      setSelectedProducts([
        ...selectedProducts,
        {
          id: selectedProductForAdd.id || selectedProductForAdd._id || '',
          name: selectedProductForAdd.name,
          price: selectedProductForAdd.price,
          quantity: currentQuantity,
          unit: selectedProductForAdd.unit || 'units',
        },
      ]);
    }

    // Reset selection
    setSelectedProductForAdd(null);
    setProductSearchText('');
    setCurrentQuantity(1);
    setShowProductDropdown(false);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      setCurrentQuantity(newQuantity);
    }
  };

  const handleRemoveProduct = (index: number) => {
    const updated = [...selectedProducts];
    updated.splice(index, 1);
    setSelectedProducts(updated);
  };

  const handleSave = async () => {
    let isValid = true;
    const newErrors = {
      customer: '',
      purchasedItems: '',
      manualTotal: '',
    };

    if (!selectedItem || selectedItem.trim() === '') {
      newErrors.customer = isSale
        ? 'Please select a customer'
        : 'Please select a supplier';
      isValid = false;
    }

    if (!selectedPartyId) {
      newErrors.customer = isSale
        ? 'Please select the customer from the list'
        : 'Please select the supplier from the list';
      isValid = false;
    }

    if (selectedProducts.length === 0) {
      newErrors.purchasedItems = 'Please add at least one product';
      isValid = false;
    }

    if (grandTotal <= 0) {
      newErrors.manualTotal = 'Please add products with valid prices';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    setSaving(true);
    try {
      const productsArray = selectedProducts.map(p => ({
        product: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        total: p.price * p.quantity,
      }));

      const itemsDescription = selectedProducts
        .map(p => `${p.name} x${p.quantity}`)
        .join(', ');

      const entryData: any = {
        entryType: mode,
        itemsDescription: itemsDescription,
        manualTotalPrice: grandTotal - (parseFloat(discount) || 0),
        products: productsArray,
        transactionDate: selectedDate.toISOString(),
        notes: notes,
        discount: parseFloat(discount) || 0,
      };

      if (isSale) {
        entryData.customer = selectedPartyId;
      } else {
        entryData.supplier = selectedPartyId;
      }

      console.log('Sending entry data:', entryData);

      await createEntry(entryData);

      showAlert('Success', 'Entry saved successfully!', 'success');
      handleCancel();
    } catch (error: any) {
      console.log('Error response:', error?.response?.data);
      const message =
        error?.response?.data?.message || 'Failed to save entry. Try again.';
      showAlert('Error', message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchAllProducts();
    } finally {
      setRefreshing(false);
    }
  };

  const handleCancel = () => {
    setSearchText('');
    setSelectedItem('');
    setSelectedPartyId(null);
    setSelectedProducts([]);
    setProductSearchText('');
    setSelectedProductForAdd(null);
    setCurrentQuantity(1);
    setNotes('');
    setDiscount('');
    setSearchResults([]);
    setErrors({
      customer: '',
      purchasedItems: '',
      manualTotal: '',
    });
  };

  const handleAddNewCustomer = () => {
    setModalVisible(true);
  };

  const handleModalSave = (customerData: {
    id?: string;
    _id?: string;
    name: string;
    email?: string;
    phoneNo?: string;
    address?: string;
  }) => {
    const id = customerData.id || customerData._id;
    if (id) {
      setSelectedPartyId(id);
    }
    setSelectedItem(customerData.name);
    setSearchText(customerData.name);
    setErrors(prev => ({ ...prev, customer: '' }));
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const renderProductRow = ({
    item,
    index,
  }: {
    item: SelectedProduct;
    index: number;
  }) => (
    <View style={styles.productRow}>
      <View style={styles.productRowLeft}>
        <Text style={styles.productRowName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productRowQty}>x{item.quantity}</Text>
      </View>
      <View style={styles.productRowRight}>
        <Text style={styles.productRowPrice}>
          PKR {item.price * item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => handleRemoveProduct(index)}
          style={styles.productRowRemove}
        >
          <Icon name="close-circle" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 64}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1E90FF']}
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Entries Here</Text>
            <Text style={styles.headerSubtitle}>
              Add a new {isSale ? 'sale' : 'purchase'} transaction
            </Text>
          </View>

          <ToggleSelector
            title="Transaction Type"
            selectedValue={isSale ? 'simple' : 'advanced'}
            leftTitle="Sale"
            rightTitle="Purchase"
            leftSubtitle="Selling Something"
            rightSubtitle="Buying Something"
            leftIcon="gift-outline"
            rightIcon="cart-outline"
            compact
            onValueChange={value => {
              setMode(value === 'simple' ? 'sale' : 'purchase');
              setSearchText('');
              setSelectedItem('');
              setSelectedPartyId(null);
              setSearchResults([]);
            }}
          />

          <View style={styles.addRow}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                {isSale ? 'Customer*' : 'Supplier*'}
              </Text>

              <View
                style={[
                  styles.searchContainer,
                  errors.customer && styles.inputError,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  style={{ flex: 1 }}
                  onPress={() => setShowDropdown(true)}
                >
                  <TextInput
                    style={styles.searchInput}
                    placeholder={
                      isSale
                        ? 'Select or Add a new Customer'
                        : 'Select or Add a new Supplier'
                    }
                    placeholderTextColor="#8E8E93"
                    value={searchText}
                    onChangeText={text => {
                      setSearchText(text);
                      setShowDropdown(true);
                      if (text === '') {
                        setSelectedItem('');
                        setSelectedPartyId(null);
                      }
                      if (errors.customer) {
                        setErrors(prev => ({ ...prev, customer: '' }));
                      }
                    }}
                    onFocus={() => setShowDropdown(true)}
                    editable={true}
                  />
                </TouchableOpacity>
              </View>
              {errors.customer ? (
                <Text style={styles.errorText}>{errors.customer}</Text>
              ) : null}

              {showDropdown && searching && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" />
                  <Text style={styles.loadingText}>Searching...</Text>
                </View>
              )}

              {showDropdown && !searching && searchResults.length > 0 && (
                <View style={styles.dropdownList}>
                  {searchResults.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.dropdownItem,
                        selectedItem === item.name &&
                          styles.dropdownItemSelected,
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedItem === item.name &&
                            styles.dropdownItemTextSelected,
                        ]}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {showDropdown &&
                !searching &&
                searchText !== '' &&
                searchResults.length === 0 && (
                  <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>No results found</Text>
                  </View>
                )}
            </View>

            <View style={styles.addButtonWrapper}>
              <GradientButton
                title={isSale ? '+ Add New Customer' : '+ Add New Supplier'}
                titleStyle={styles.buttonText}
                onPress={handleAddNewCustomer}
              />
            </View>
          </View>

          {/* Products Selection Section - NEW LAYOUT */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Add Products *</Text>

            {/* Search Bar with Quantity Selector */}
            <View style={styles.productSearchRow}>
              <View style={styles.productSearchContainer}>
                <Icon
                  name="search-outline"
                  size={20}
                  color="#8E8E93"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.productSearchInput}
                  placeholder="Search products..."
                  placeholderTextColor="#8E8E93"
                  value={productSearchText}
                  onChangeText={text => {
                    setProductSearchText(text);
                    if (text.trim() !== '') {
                      setShowProductDropdown(true);
                    } else {
                      setShowProductDropdown(false);
                      setSelectedProductForAdd(null);
                    }
                    if (errors.purchasedItems) {
                      setErrors(prev => ({ ...prev, purchasedItems: '' }));
                    }
                  }}
                  onFocus={() => {
                    if (
                      productSearchText.trim() !== '' &&
                      allProducts.length > 0
                    ) {
                      setShowProductDropdown(true);
                    }
                  }}
                />
                {productSearchText !== '' && (
                  <TouchableOpacity onPress={() => setProductSearchText('')}>
                    <Icon name="close-circle" size={20} color="#8E8E93" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Quantity Selector */}
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={() => handleQuantityChange(-1)}
                >
                  <Icon name="remove" size={18} color="#1E90FF" />
                </TouchableOpacity>
                <Text style={styles.quantityValue}>{currentQuantity}</Text>
                <TouchableOpacity
                  style={styles.quantityBtn}
                  onPress={() => handleQuantityChange(1)}
                >
                  <Icon name="add" size={18} color="#1E90FF" />
                </TouchableOpacity>
              </View>
            </View>

            {errors.purchasedItems ? (
              <Text style={styles.errorText}>{errors.purchasedItems}</Text>
            ) : null}

            {/* Product Search Results Dropdown */}
            {showProductDropdown && productSearchResults.length > 0 && (
              <View style={styles.dropdownList}>
                {productSearchResults.map(product => (
                  <TouchableOpacity
                    key={product._id || product.id}
                    style={[
                      styles.dropdownItem,
                      selectedProductForAdd?.id === product.id &&
                        styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleSelectProduct(product)}
                  >
                    <View style={styles.productDropdownItem}>
                      <Text style={styles.dropdownItemText}>
                        {product.name}
                      </Text>
                      <Text style={styles.productDropdownPrice}>
                        PKR {product.price} / {product.unit || 'unit'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {showProductDropdown &&
              productSearchText !== '' &&
              productSearchResults.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>No products found</Text>
                </View>
              )}

            {/* Add Product Button - Simple Button */}
            <TouchableOpacity
              style={styles.addProductButton}
              onPress={handleAddProductToList}
              activeOpacity={0.7}
            >
              <Text style={styles.addProductButtonText}>+ Add New Product</Text>
            </TouchableOpacity>

            {/* Selected Products List */}
            {selectedProducts.length > 0 && (
              <View style={styles.selectedProductsList}>
                <Text style={styles.selectedProductsTitle}>
                  Selected Products
                </Text>
                <FlatList
                  data={selectedProducts}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  renderItem={renderProductRow}
                  scrollEnabled={false}
                />
              </View>
            )}

            {/* Totals Row - Discount and Final Total */}
            <View style={styles.totalsRow}>
              {/* Discount Box - First */}
              <View style={styles.totalFieldContainer}>
                <Text style={styles.totalLabel}>Discount</Text>
                <View style={styles.totalBox}>
                  <View style={styles.discountInputContainer}>
                    <Text style={styles.discountCurrency}>PKR</Text>
                    <TextInput
                      style={styles.discountInput}
                      placeholder="0"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      value={discount}
                      onChangeText={text => {
                        setDiscount(text);
                      }}
                    />
                  </View>
                </View>
                {parseFloat(discount) < 0 && (
                  <Text style={styles.errorText}>Cannot be negative</Text>
                )}
                {parseFloat(discount) > grandTotal && (
                  <Text style={styles.errorText}>Exceeds total</Text>
                )}
              </View>

              {/* Final Total Box - Second */}
              <View style={styles.totalFieldContainer}>
                <Text style={styles.totalLabel}>Final Total</Text>
                <View style={[styles.totalBox, styles.finalTotalBox]}>
                  <Text style={styles.finalTotalBoxValue}>
                    PKR {(grandTotal - (parseFloat(discount) || 0)).toFixed(0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date & Time *</Text>
            <View style={styles.dateTimeRow}>
              <TouchableOpacity
                style={[
                  styles.input,
                  styles.dateTimeInput,
                  styles.dateInput,
                  { flex: 1, marginRight: 8 },
                ]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateTimeText}>
                  {selectedDate.toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.input,
                  styles.dateTimeInput,
                  styles.timeInput,
                  { flex: 1, marginLeft: 8 },
                ]}
                onPress={() => setShowTimePicker(true)}
              >
                <Text style={styles.dateTimeText}>
                  {selectedDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Notes (Optional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Add notes here..."
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.saveButtonWrapper}>
            {saving ? (
              <ActivityIndicator size="small" />
            ) : (
              <GradientButton
                title="Save Entry"
                titleStyle={styles.buttonText}
                onPress={handleSave}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancel}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AddCustomerModal
        visible={modalVisible}
        isSale={isSale}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </KeyboardAvoidingView>
  );
};

export default AdvanceUserAddScreen;
