import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ToggleSelector from '../../components/Toggle/ToggleSelector';
import GradientButton from '../../components/Buttons/GradientButton';
import styles from './styles';

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
  const [paymentType, setPaymentType] = useState('');
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  const [notes, setNotes] = useState('');

  const customers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Sarah Williams' },
  ];

  const suppliers = [
    { id: '1', name: 'ABC Supplies' },
    { id: '2', name: 'XYZ Distributors' },
    { id: '3', name: 'Global Traders' },
    { id: '4', name: 'Local Suppliers Inc.' },
  ];

  const paymentOptions = [
    { id: '1', name: 'Cash' },
    { id: '2', name: 'Online' },
  ];

  const data = isSale ? customers : suppliers;

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const handleSelect = (item: { id: string; name: string }) => {
    setSelectedItem(item.name);
    setSearchText(item.name);
    setShowDropdown(false);
  };

  const handlePaymentSelect = (item: { id: string; name: string }) => {
    setPaymentType(item.name);
    setShowPaymentDropdown(false);
  };

  const handleSave = () => {
    // Save entry logic here
    console.log('Saving entry...');
  };

  const handleCancel = () => {
    // Cancel/Reset logic here
    console.log('Cancelled');
  };

  const renderContent = () => (
    <View style={styles.container}>
      <ToggleSelector
        title="Transaction Type"
        selectedValue={isSale ? 'simple' : 'advanced'}
        leftTitle="Sale"
        rightTitle="Purchase"
        compact
        onValueChange={value =>
          setMode(value === 'simple' ? 'sale' : 'purchase')
        }
      />

      <View style={styles.addRow}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>{isSale ? 'Customer*' : 'Supplier*'}</Text>

          <View style={styles.searchContainer}>
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

          {showDropdown && filteredData.length > 0 && (
            <View style={styles.dropdownList}>
              {filteredData.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.dropdownItem,
                    selectedItem === item.name && styles.dropdownItemSelected,
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

          {showDropdown && searchText !== '' && filteredData.length === 0 && (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          )}
        </View>

        <View style={styles.addButtonWrapper}>
          <GradientButton
            title={isSale ? '+ Add New Customer' : '+ Add New Supplier'}
            titleStyle={styles.buttonText}
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Purchased Items</Text>
        <TextInput
          style={styles.textArea}
          placeholder="e.g. Milk, Eggs, Bread, Butter..."
          placeholderTextColor="#8E8E93"
          multiline
          numberOfLines={4}
          value={purchasedItems}
          onChangeText={setPurchasedItems}
          textAlignVertical="top"
        />
        <Text style={styles.hintText}>
          Type multiple items separated by commas
        </Text>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Manual Total Price *</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>PKR</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor="#8E8E93"
            keyboardType="numeric"
            value={manualTotal}
            onChangeText={setManualTotal}
          />
        </View>
      </View>

      {/* Date and Payment Type - Side by Side */}
      <View style={styles.rowContainer}>
        <View style={styles.halfFieldContainer}>
          <Text style={styles.label}>Date & Time *</Text>
          <TextInput
            style={styles.halfInput}
            placeholder="YYYY-MM-DD HH:MM"
            placeholderTextColor="#8E8E93"
            value={dateTime}
            onChangeText={setDateTime}
          />
        </View>

        <View style={styles.halfFieldContainer}>
          <Text style={styles.label}>Payment Type *</Text>
          <View style={styles.halfSearchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Select payment type"
              placeholderTextColor="#8E8E93"
              value={paymentType}
              editable={false}
              onFocus={() => setShowPaymentDropdown(true)}
            />
            <TouchableOpacity
              style={styles.dropdownIcon}
              onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}
            >
              <Icon
                name={showPaymentDropdown ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>

          {showPaymentDropdown && (
            <View style={styles.dropdownList}>
              {paymentOptions.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.dropdownItem,
                    paymentType === item.name && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handlePaymentSelect(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      paymentType === item.name &&
                        styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
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
        <GradientButton
          title="Save Entry"
          titleStyle={styles.buttonText}
          onPress={handleSave}
        />
      </View>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {renderContent()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddScreen;