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

interface ProductEntry {
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

  // Product selection states - Each product has its own search and quantity
  const [productEntries, setProductEntries] = useState<ProductEntry[]>([
    { id: '', name: '', price: 0, quantity: 1, unit: 'units' },
  ]);
  const [productSearchTexts, setProductSearchTexts] = useState<string[]>(['']);
  const [productSearchResults, setProductSearchResults] = useState<ProductResult[]>([]);
  const [showProductDropdown, setShowProductDropdown] = useState<boolean[]>([false]);
  const [allProducts, setAllProducts] = useState<ProductResult[]>([]);
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

  // Calculate grand total from all products
  const grandTotal = productEntries.reduce(
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

  // Filter products based on search for each entry
  const handleSearchTextChange = (text: string, index: number) => {
    const newSearchTexts = [...productSearchTexts];
    newSearchTexts[index] = text;
    setProductSearchTexts(newSearchTexts);

    const newShowDropdown = [...showProductDropdown];
    if (text.trim() !== '') {
      newShowDropdown[index] = true;
    } else {
      newShowDropdown[index] = false;
      const newEntries = [...productEntries];
      newEntries[index] = { ...newEntries[index], id: '', name: '', price: 0 };
      setProductEntries(newEntries);
    }
    setShowProductDropdown(newShowDropdown);

    if (errors.purchasedItems) {
      setErrors(prev => ({ ...prev, purchasedItems: '' }));
    }
  };

  const handleSelectProduct = (product: ProductResult, index: number) => {
    const newEntries = [...productEntries];
    newEntries[index] = {
      ...newEntries[index],
      id: product.id || product._id || '',
      name: product.name,
      price: product.price,
      unit: product.unit || 'units',
    };
    setProductEntries(newEntries);

    const newSearchTexts = [...productSearchTexts];
    newSearchTexts[index] = product.name;
    setProductSearchTexts(newSearchTexts);

    const newShowDropdown = [...showProductDropdown];
    newShowDropdown[index] = false;
    setShowProductDropdown(newShowDropdown);
  };

  const handleQuantityChange = (index: number, change: number) => {
    const newEntries = [...productEntries];
    const newQuantity = (newEntries[index].quantity || 1) + change;
    if (newQuantity >= 1) {
      newEntries[index].quantity = newQuantity;
      setProductEntries(newEntries);
    }
  };

  const handleAddProductToList = () => {
    // Add a new empty product entry
    setProductEntries(prev => [...prev, { id: '', name: '', price: 0, quantity: 1, unit: 'units' }]);
    setProductSearchTexts(prev => [...prev, '']);
    setShowProductDropdown(prev => [...prev, false]);
  };

  const handleRemoveProduct = (index: number) => {
    if (productEntries.length <= 1) {
      showAlert('Warning', 'You must have at least one product entry', 'warning');
      return;
    }
    const newEntries = [...productEntries];
    newEntries.splice(index, 1);
    setProductEntries(newEntries);

    const newSearchTexts = [...productSearchTexts];
    newSearchTexts.splice(index, 1);
    setProductSearchTexts(newSearchTexts);

    const newShowDropdown = [...showProductDropdown];
    newShowDropdown.splice(index, 1);
    setShowProductDropdown(newShowDropdown);
  };

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

    const validProducts = productEntries.filter(p => p.id && p.name);
    if (validProducts.length === 0) {
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
      const validProductsArray = productEntries.filter(p => p.id && p.name);
      const productsArray = validProductsArray.map(p => ({
        product: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
        total: p.price * p.quantity,
      }));

      const itemsDescription = validProductsArray
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
    setProductEntries([{ id: '', name: '', price: 0, quantity: 1, unit: 'units' }]);
    setProductSearchTexts(['']);
    setShowProductDropdown([false]);
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

  // Filter products for dropdown based on search text at index
  const getFilteredProducts = (index: number) => {
    const searchText = productSearchTexts[index] || '';
    if (searchText.trim() === '') return [];
    return allProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (product.category &&
          product.category.toLowerCase().includes(searchText.toLowerCase())),
    );
  };

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

          {/* Products Selection Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Add Products *</Text>

            {/* Product Entries */}
            {productEntries.map((entry, index) => {
              const filteredProducts = getFilteredProducts(index);
              const showDropdownForIndex = showProductDropdown[index] || false;

              return (
                <View key={index} style={styles.productEntryContainer}>
                  {/* Search Bar with Quantity Selector in Row */}
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
                        value={productSearchTexts[index] || ''}
                        onChangeText={text => handleSearchTextChange(text, index)}
                        onFocus={() => {
                          if ((productSearchTexts[index] || '').trim() !== '' && allProducts.length > 0) {
                            const newShowDropdown = [...showProductDropdown];
                            newShowDropdown[index] = true;
                            setShowProductDropdown(newShowDropdown);
                          }
                        }}
                      />
                      {productSearchTexts[index] && productSearchTexts[index] !== '' && (
                        <TouchableOpacity onPress={() => handleSearchTextChange('', index)}>
                          <Icon name="close-circle" size={20} color="#8E8E93" />
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Quantity Selector */}
                    <View style={styles.quantitySelector}>
                      <TouchableOpacity
                        style={styles.quantityBtn}
                        onPress={() => handleQuantityChange(index, -1)}
                      >
                        <Icon name="remove" size={18} color="#1E90FF" />
                      </TouchableOpacity>
                      <Text style={styles.quantityValue}>{entry.quantity || 1}</Text>
                      <TouchableOpacity
                        style={styles.quantityBtn}
                        onPress={() => handleQuantityChange(index, 1)}
                      >
                        <Icon name="add" size={18} color="#1E90FF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Product Search Results Dropdown */}
                  {showDropdownForIndex && filteredProducts.length > 0 && (
                    <View style={styles.dropdownList}>
                      {filteredProducts.map(product => (
                        <TouchableOpacity
                          key={product._id || product.id}
                          style={[
                            styles.dropdownItem,
                            entry.id === product.id && styles.dropdownItemSelected,
                          ]}
                          onPress={() => handleSelectProduct(product, index)}
                        >
                          <View style={styles.productDropdownItem}>
                            <Text style={styles.dropdownItemText}>{product.name}</Text>
                            <Text style={styles.productDropdownPrice}>
                              PKR {product.price} / {product.unit || 'unit'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {showDropdownForIndex &&
                    (productSearchTexts[index] || '').trim() !== '' &&
                    filteredProducts.length === 0 && (
                      <View style={styles.noResults}>
                        <Text style={styles.noResultsText}>No products found</Text>
                      </View>
                    )}

                  {/* Remove Product Button for entries after the first one */}
                  {index > 0 && (
                    <TouchableOpacity
                      style={styles.removeProductEntryBtn}
                      onPress={() => handleRemoveProduct(index)}
                    >
                      <Icon name="close-circle" size={18} color="#FF3B30" />
                      <Text style={styles.removeProductEntryText}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}

            {errors.purchasedItems ? (
              <Text style={styles.errorText}>{errors.purchasedItems}</Text>
            ) : null}

            {/* Add Product Button */}
            <TouchableOpacity
              style={styles.addProductButton}
              onPress={handleAddProductToList}
              activeOpacity={0.7}
            >
              <Text style={styles.addProductButtonText}>+ Add New Product</Text>
            </TouchableOpacity>

            {/* Totals Row - Discount and Final Total */}
            <View style={styles.totalsRow}>
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