import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import ToggleSelector from '../../components/Toggle/ToggleSelector';
import GradientButton from '../../components/Buttons/GradientButton';
import AddCustomerModal from './AddCustomerModal';
import { useAlert } from '../../hooks/useAlert';
import styles from './styles';
import { searchCustomers, CustomerResult } from '../../services/customerApi';
import { searchSuppliers, SupplierResult } from '../../services/supplierApi';
import { createEntry } from '../../services/entryApi';
import { getProducts, ProductResult } from '../../services/productsApi';

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
  const [isProductSearching, setIsProductSearching] = useState(false);
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

  // Fetch all customers
  const fetchAllCustomers = async () => {
    try {
      const results = await searchCustomers(' ');
      setSearchResults(results.map(mapCustomerResult));
      if (results.length > 0) {
        setShowDropdown(true); // Show dropdown only if results exist
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setShowDropdown(false);
    }
  };

  // Fetch all suppliers
  const fetchAllSuppliers = async () => {
    try {
      const results = await searchSuppliers(' ');
      setSearchResults(results.map(mapSupplierResult));
      if (results.length > 0) {
        setShowDropdown(true); // Show dropdown only if results exist
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setShowDropdown(false);
    }
  };

  // Filter products based on search
  useEffect(() => {
    if (productSearchText.trim() === '') {
      // Don't clear results, keep showing all products when dropdown is open
      // Only clear if dropdown is not shown
      if (!showProductDropdown) {
        setProductSearchResults([]);
      } else {
        setProductSearchResults(allProducts);
      }
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
  }, [productSearchText, allProducts, showProductDropdown]);

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
    const existingIndex = selectedProducts.findIndex(p => p.id === product.id);

    if (existingIndex !== -1) {
      // Product already added, increase quantity
      const updated = [...selectedProducts];
      updated[existingIndex].quantity += 1;
      setSelectedProducts(updated);
    } else {
      // Add new product with quantity 1
      setSelectedProducts([
        ...selectedProducts,
        {
          id: product.id || product._id || '',
          name: product.name,
          price: product.price,
          quantity: 1,
          unit: product.unit || 'units',
        },
      ]);
    }

    setProductSearchText('');
    setShowProductDropdown(false);
  };

  const handleQuantityChange = (index: number, change: number) => {
    const updated = [...selectedProducts];
    const newQuantity = updated[index].quantity + change;
    if (newQuantity >= 1) {
      updated[index].quantity = newQuantity;
      setSelectedProducts(updated);
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
      // Build products array for backend
      const productsArray = selectedProducts.map(p => ({
        product: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        total: p.price * p.quantity,
      }));

      // Build itemsDescription for backward compatibility / display
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

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 64}
    >
      <FlatList
        data={[]}
        keyExtractor={() => 'main'}
        renderItem={null}
        ListHeaderComponent={
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
                  <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                    <TextInput
                      style={styles.searchInput}
                      placeholder={
                        isSale
                          ? 'Search or select customer'
                          : 'Search or select supplier'
                      }
                      placeholderTextColor="#8E8E93"
                      value={searchText}
                      onChangeText={text => {
                        setSearchText(text);
                        if (text === '') {
                          setSelectedItem('');
                          setSelectedPartyId(null);
                          setShowDropdown(false); // Hide dropdown when empty
                        } else {
                          setShowDropdown(true); // Show dropdown when typing
                        }
                        if (errors.customer) {
                          setErrors(prev => ({ ...prev, customer: '' }));
                        }
                      }}
                      onFocus={() => {
                        if (searchText.trim() === '') {
                          if (isSale) {
                            fetchAllCustomers();
                          } else {
                            fetchAllSuppliers();
                          }
                        }
                      }}
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
                  <View style={styles.dropdownListContainer}>
                    <ScrollView
                      nestedScrollEnabled={true}
                      showsVerticalScrollIndicator={true}
                    >
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
                    </ScrollView>
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

            {/* Products Selection Section */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionLabel}>Add Products *</Text>

              {/* Product Search Input */}
              <View style={styles.searchContainer}>
                <Icon
                  name="search-outline"
                  size={20}
                  color="#8E8E93"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search products..."
                  placeholderTextColor="#8E8E93"
                  value={productSearchText}
                  onChangeText={text => {
                    setProductSearchText(text);
                    if (text.trim() !== '') {
                      setShowProductDropdown(true);
                    } else {
                      setShowProductDropdown(true);
                      setProductSearchResults(allProducts);
                    }
                    if (errors.purchasedItems) {
                      setErrors(prev => ({ ...prev, purchasedItems: '' }));
                    }
                  }}
                onFocus={() => {
  if (productSearchText.trim() === '') {
    setProductSearchResults(allProducts);
    if (allProducts.length > 0) {
      setShowProductDropdown(true);
    }
  }
}}
                />
                {productSearchText !== '' && (
                  <TouchableOpacity onPress={() => setProductSearchText('')}>
                    <Icon name="close-circle" size={20} color="#8E8E93" />
                  </TouchableOpacity>
                )}
              </View>

              {errors.purchasedItems ? (
                <Text style={styles.errorText}>{errors.purchasedItems}</Text>
              ) : null}

              {/* Product Search Results Dropdown */}
              {showProductDropdown && productSearchResults.length > 0 && (
                <View style={styles.dropdownListContainer}>
                  <ScrollView
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                  >
                    {productSearchResults.map(item => (
                      <TouchableOpacity
                        key={item._id || item.id || Math.random().toString()}
                        style={styles.dropdownItem}
                        onPress={() => handleSelectProduct(item)}
                      >
                        <View style={styles.productDropdownItem}>
                          <Text style={styles.dropdownItemText}>
                            {item.name}
                          </Text>
                          <Text style={styles.productDropdownPrice}>
                            PKR {item.price} / {item.unit || 'unit'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              {showProductDropdown &&
                productSearchText !== '' &&
                productSearchResults.length === 0 && (
                  <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>No products found</Text>
                  </View>
                )}

              {/* Selected Products List */}
              {selectedProducts.length > 0 && (
                <View style={styles.selectedProductsContainer}>
                  <Text style={styles.selectedProductsTitle}>
                    Selected Products
                  </Text>
                  {selectedProducts.map((item, index) => (
                    <View key={index} style={styles.selectedProductCard}>
                      <View style={styles.selectedProductHeader}>
                        <Text style={styles.selectedProductName}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleRemoveProduct(index)}
                          style={styles.removeProductButton}
                        >
                          <Icon name="close-circle" size={20} color="#FF3B30" />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.selectedProductBody}>
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(index, -1)}
                          >
                            <Icon name="remove" size={18} color="#1E90FF" />
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => handleQuantityChange(index, 1)}
                          >
                            <Icon name="add" size={18} color="#1E90FF" />
                          </TouchableOpacity>
                          <Text style={styles.unitText}>{item.unit}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                          <Text style={styles.priceLabel}>Price:</Text>
                          <Text style={styles.priceValue}>
                            PKR {item.price * item.quantity}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Grand Total */}
              <View style={styles.grandTotalContainer}>
                <Text style={styles.grandTotalLabel}>Grand Total</Text>
                <Text style={styles.grandTotalValue}>PKR {grandTotal}</Text>
              </View>

              {/* Discount */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Discount (if any)</Text>
                <View
                  style={[
                    styles.amountContainer,
                    parseFloat(discount) < 0 && styles.inputError,
                  ]}
                >
                  <Text style={styles.currencySymbol}>PKR</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    placeholderTextColor="#8E8E93"
                    keyboardType="numeric"
                    value={discount}
                    onChangeText={text => {
                      setDiscount(text);
                    }}
                  />
                </View>
                {parseFloat(discount) < 0 && (
                  <Text style={styles.errorText}>
                    Discount cannot be negative
                  </Text>
                )}
                {parseFloat(discount) > grandTotal && (
                  <Text style={styles.errorText}>
                    Discount cannot exceed Grand Total
                  </Text>
                )}
              </View>

              {/* Final Total */}
              <View style={styles.finalTotalContainer}>
                <Text style={styles.finalTotalLabel}>Final Total</Text>
                <Text style={styles.finalTotalValue}>
                  PKR {(grandTotal - (parseFloat(discount) || 0)).toFixed(2)}
                </Text>
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
        }
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
      />

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
