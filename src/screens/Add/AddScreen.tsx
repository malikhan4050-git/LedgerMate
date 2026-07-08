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

import ToggleSelector from '../../components/Toggle/ToggleSelector';
import GradientButton from '../../components/Buttons/GradientButton';
import AddCustomerModal from './AddCustomerModal';
import styles from './styles';
import { searchCustomers, CustomerResult } from '../../services/customerApi';
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState('');
  const [manualTotal, setManualTotal] = useState('');
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });
  const [notes, setNotes] = useState('');

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({
    customer: '',
    purchasedItems: '',
    manualTotal: '',
  });

  // Live search results from backend (dummy data removed)
  const [searchResults, setSearchResults] = useState<Party[]>([]);
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mapResult = (item: CustomerResult): Party => ({
    id: item.id || item._id || item.name,
    name: item.name,
    email: item.email,
    phoneNo: item.phoneNo,
    address: item.address,
  });

  // Debounced search whenever searchText or mode changes
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
        const results = await searchCustomers(searchText.trim(), mode);
        setSearchResults(results.map(mapResult));
      } catch (error) {
        console.log('Customer search failed:', error);
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
  }, [searchText, mode]);

  const handleSelect = (item: Party) => {
    setSelectedItem(item.name);
    setSearchText(item.name);
    setShowDropdown(false);
    setErrors((prev) => ({ ...prev, customer: '' }));
  };

  const handleSave = async () => {
    // Validate fields
    let isValid = true;
    const newErrors = {
      customer: '',
      purchasedItems: '',
      manualTotal: '',
    };

    // Validate Customer/Supplier
    if (!selectedItem || selectedItem.trim() === '') {
      newErrors.customer = isSale
        ? 'Please select a customer'
        : 'Please select a supplier';
      isValid = false;
    }

    // Validate Purchased Items
    if (!purchasedItems || purchasedItems.trim() === '') {
      newErrors.purchasedItems = 'Please enter purchased items';
      isValid = false;
    }

    // Validate Manual Total Price
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
      await createEntry({
        name: selectedItem,
        entryType: mode,
        itemsDescription: purchasedItems,
        manualTotalPrice: parseFloat(manualTotal),
        transactionDate: new Date(dateTime).toISOString(),
      });

      Alert.alert('Success', 'Entry saved successfully!');
      handleCancel();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Failed to save entry. Try again.';
      Alert.alert('Error', message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset all fields
    setSearchText('');
    setSelectedItem('');
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

  // Modal handlers
  const handleAddNewCustomer = () => {
    setModalVisible(true);
  };

  // Called after AddCustomerModal successfully saves via API.
  const handleModalSave = (customerData: {
    id?: string;
    _id?: string;
    name: string;
    email?: string;
    phoneNo?: string;
    address?: string;
  }) => {
    // Select the newly added customer directly - no need to store locally
    // since the list now comes live from the backend search.
    setSelectedItem(customerData.name);
    setSearchText(customerData.name);
    setErrors((prev) => ({ ...prev, customer: '' }));
    setModalVisible(false);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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
            compact
            onValueChange={(value) => {
              setMode(value === 'simple' ? 'sale' : 'purchase');
              setSearchText('');
              setSelectedItem('');
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
                <TextInput
                  style={styles.searchInput}
                  placeholder={
                    isSale
                      ? 'Search or select customer'
                      : 'Search or select supplier'
                  }
                  placeholderTextColor="#8E8E93"
                  value={searchText}
                  onChangeText={(text) => {
                    setSearchText(text);
                    setShowDropdown(true);
                    if (text === '') {
                      setSelectedItem('');
                    }
                    if (errors.customer) {
                      setErrors((prev) => ({ ...prev, customer: '' }));
                    }
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                <TouchableOpacity
                  style={styles.dropdownIcon}
                  onPress={() => setShowDropdown(!showDropdown)}
                >
                  <Icon
                    name={showDropdown ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#8E8E93"
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
                  {searchResults.map((item) => (
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
              onChangeText={(text) => {
                setPurchasedItems(text);
                if (errors.purchasedItems) {
                  setErrors((prev) => ({ ...prev, purchasedItems: '' }));
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
                onChangeText={(text) => {
                  setManualTotal(text);
                  if (errors.manualTotal) {
                    setErrors((prev) => ({ ...prev, manualTotal: '' }));
                  }
                }}
              />
            </View>
            {errors.manualTotal ? (
              <Text style={styles.errorText}>{errors.manualTotal}</Text>
            ) : null}
          </View>

          {/* Date and Time - Full Width */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Date & Time *</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD HH:MM"
              placeholderTextColor="#8E8E93"
              value={dateTime}
              onChangeText={setDateTime}
            />
          </View>

          {/* Notes Section - Optional */}
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

          {/* Action Buttons - Stacked Vertically */}
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

      {/* Modal Component */}
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