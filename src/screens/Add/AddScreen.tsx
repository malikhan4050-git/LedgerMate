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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import ToggleSelector from '../../components/Toggle/ToggleSelector';
import GradientButton from '../../components/Buttons/GradientButton';
import AddCustomerModal from './AddCustomerModal';
import styles from './styles';
import { searchCustomers, CustomerResult } from '../../services/customerApi';
import { searchSuppliers, SupplierResult } from '../../services/supplierApi';
import { createEntry } from '../../services/entryApi';

interface Party {
  id: string;
  name: string;
  email?: string;
  phoneNo?: string;
  address?: string;
}

const AddScreen = () => {
  const [mode, setMode] = useState<'sale' | 'purchase'>('sale');
  const isSale = mode === 'sale';

  const [searchText, setSearchText] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState('');
  const [manualTotal, setManualTotal] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isManuallySet, setIsManuallySet] = useState(false);
  const [notes, setNotes] = useState('');

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
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
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

    if (!purchasedItems || purchasedItems.trim() === '') {
      newErrors.purchasedItems = 'Please enter purchased items';
      isValid = false;
    }

    if (
      !manualTotal ||
      manualTotal.trim() === '' ||
      parseFloat(manualTotal) <= 0
    ) {
      newErrors.manualTotal = 'Please enter a valid total price';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return;
    }

    setSaving(true);
    try {
      const entryData: any = {
        entryType: mode,
        itemsDescription: purchasedItems,
        manualTotalPrice: parseFloat(manualTotal),
        transactionDate: selectedDate.toISOString(),
        notes: notes,
      };

      if (isSale) {
        entryData.customer = selectedPartyId;
      } else {
        entryData.supplier = selectedPartyId;
      }

      console.log('Sending entry data:', entryData);

      await createEntry(entryData);

      Alert.alert('Success', 'Entry saved successfully!');
      handleCancel();
    } catch (error: any) {
      console.log('Error response:', error?.response?.data);
      const message =
        error?.response?.data?.message || 'Failed to save entry. Try again.';
      Alert.alert('Error', message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSearchText('');
    setSelectedItem('');
    setSelectedPartyId(null);
    setPurchasedItems('');
    setManualTotal('');
    setNotes('');
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
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
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
                  activeOpacity={1} // Prevents visual flash on press
                  style={{ flex: 1 }}
                  onPress={() => setShowDropdown(true)} // 👈 Tapping anywhere opens dropdown
                >
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
                      setShowDropdown(true);
                      if (text === '') {
                        setSelectedItem('');
                        setSelectedPartyId(null);
                      }
                      if (errors.customer) {
                        setErrors(prev => ({ ...prev, customer: '' }));
                      }
                    }}
                    onFocus={() => setShowDropdown(true)} // 👈 Backup for native focus
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

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionLabel}>Purchased Items *</Text>
            <TextInput
              style={[
                styles.textArea,
                errors.purchasedItems && styles.inputError,
              ]}
              placeholder="e.g. Milk, Eggs, Bread, Butter..."
              placeholderTextColor="#8E8E93"
              multiline
              numberOfLines={4}
              value={purchasedItems}
              onChangeText={text => {
                setPurchasedItems(text);
                if (errors.purchasedItems) {
                  setErrors(prev => ({ ...prev, purchasedItems: '' }));
                }
              }}
              textAlignVertical="top"
            />
            {errors.purchasedItems ? (
              <Text style={styles.errorText}>{errors.purchasedItems}</Text>
            ) : null}
            <Text style={styles.hintText}>
              Type multiple items separated by commas
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Manual Total Price *</Text>
            <View
              style={[
                styles.amountContainer,
                errors.manualTotal && styles.inputError,
              ]}
            >
              <Text style={styles.currencySymbol}>PKR</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
                value={manualTotal}
                onChangeText={text => {
                  setManualTotal(text);
                  if (errors.manualTotal) {
                    setErrors(prev => ({ ...prev, manualTotal: '' }));
                  }
                }}
              />
            </View>
            {errors.manualTotal ? (
              <Text style={styles.errorText}>{errors.manualTotal}</Text>
            ) : null}
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date & Time *</Text>
            <View style={styles.dateTimeRow}>
              {/* Date picker button */}
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

            {/* Time Picker */}
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

export default AddScreen;
