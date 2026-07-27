import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { useAlert } from '../../../hooks/useAlert';
import GradientButton from '../../../components/Buttons/GradientButton';
import { updateBusiness } from '../../../redux/slices/sessionSlice';
import styles from '../styles/stylesBusiness';
import type { RootState } from '../../../redux/store';

const EditBusinessInfoScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const business = useSelector((state: RootState) => state.session.business);

  const [businessName, setBusinessName] = useState(
    business?.businessName || '',
  );
  const [ownerName, setOwnerName] = useState(business?.ownerName || '');
  const [phoneNo, setPhoneNo] = useState(business?.phoneNo || '');
  const [businessType, setBusinessType] = useState(
    business?.businessType || '',
  );
  const [address, setAddress] = useState(business?.address || '');
  const [currency, setCurrency] = useState(business?.currency || 'PKR');

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [errors, setErrors] = useState({
    businessName: '',
    ownerName: '',
    phoneNo: '',
    businessType: '',
    address: '',
    currency: '',
  });

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      businessName: '',
      ownerName: '',
      phoneNo: '',
      businessType: '',
      address: '',
      currency: '',
    };

    if (!businessName || businessName.trim() === '') {
      newErrors.businessName = 'Please enter business name';
      isValid = false;
    }

    if (!ownerName || ownerName.trim() === '') {
      newErrors.ownerName = 'Please enter owner name';
      isValid = false;
    }

    if (!phoneNo || phoneNo.trim() === '') {
      newErrors.phoneNo = 'Please enter phone number';
      isValid = false;
    }

    if (!businessType || businessType.trim() === '') {
      newErrors.businessType = 'Please enter business type';
      isValid = false;
    }

    if (!address || address.trim() === '') {
      newErrors.address = 'Please enter address';
      isValid = false;
    }

    if (!currency || currency.trim() === '') {
      newErrors.currency = 'Please enter currency';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const updatedBusiness = {
        businessName: businessName.trim(),
        ownerName: ownerName.trim(),
        phoneNo: phoneNo.trim(),
        businessType: businessType.trim(),
        address: address.trim(),
        currency: currency.trim(),
        mode: business?.mode || 'simple',
      };

      await AsyncStorage.setItem('business', JSON.stringify(updatedBusiness));
      dispatch(updateBusiness(updatedBusiness));

      showAlert(
        'Success',
        'Business information updated successfully!',
        'success',
      );

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      console.error('Update error:', error);
      showAlert(
        'Error',
        error?.message ||
          'Failed to update business information. Please try again.',
        'error',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const getModeDisplay = () => {
    const mode = business?.mode || 'simple';
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={['#4A90E2', '#4CCB8C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height:
            Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
          paddingTop:
            Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1E90FF']}
            />
          }
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Business Information</Text>
            <Text style={styles.subtitle}>
              View and update your business details
            </Text>
          </View>

          <View style={styles.container}>
            {/* Business Logo */}
            <TouchableOpacity style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="business-outline" size={50} color="#FFFFFF" />
              </View>
              <Text style={styles.avatarChangeText}>Your Business Information</Text>
            </TouchableOpacity>

            {/* Business Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Business Name *</Text>
              <TextInput
                style={[styles.input, errors.businessName && styles.inputError]}
                placeholder="Enter business name"
                placeholderTextColor="#8E8E93"
                value={businessName}
                onChangeText={text => {
                  setBusinessName(text);
                  if (errors.businessName)
                    setErrors(prev => ({ ...prev, businessName: '' }));
                }}
                editable={!loading}
              />
              {errors.businessName ? (
                <Text style={styles.errorText}>{errors.businessName}</Text>
              ) : null}
            </View>

            {/* Owner Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Owner Name *</Text>
              <TextInput
                style={[styles.input, errors.ownerName && styles.inputError]}
                placeholder="Enter owner name"
                placeholderTextColor="#8E8E93"
                value={ownerName}
                onChangeText={text => {
                  setOwnerName(text);
                  if (errors.ownerName)
                    setErrors(prev => ({ ...prev, ownerName: '' }));
                }}
                editable={!loading}
              />
              {errors.ownerName ? (
                <Text style={styles.errorText}>{errors.ownerName}</Text>
              ) : null}
            </View>

            {/* Phone Number */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number *</Text>
              <TextInput
                style={[styles.input, errors.phoneNo && styles.inputError]}
                placeholder="Enter phone number"
                placeholderTextColor="#8E8E93"
                keyboardType="phone-pad"
                value={phoneNo}
                onChangeText={text => {
                  setPhoneNo(text);
                  if (errors.phoneNo)
                    setErrors(prev => ({ ...prev, phoneNo: '' }));
                }}
                editable={!loading}
              />
              {errors.phoneNo ? (
                <Text style={styles.errorText}>{errors.phoneNo}</Text>
              ) : null}
            </View>

            {/* Business Type */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Business Type *</Text>
              <TextInput
                style={[styles.input, errors.businessType && styles.inputError]}
                placeholder="e.g. Retail, Wholesale, Services"
                placeholderTextColor="#8E8E93"
                value={businessType}
                onChangeText={text => {
                  setBusinessType(text);
                  if (errors.businessType)
                    setErrors(prev => ({ ...prev, businessType: '' }));
                }}
                editable={!loading}
              />
              {errors.businessType ? (
                <Text style={styles.errorText}>{errors.businessType}</Text>
              ) : null}
            </View>

            {/* Address */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Address *</Text>
              <TextInput
                style={[styles.input, errors.address && styles.inputError]}
                placeholder="Enter business address"
                placeholderTextColor="#8E8E93"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                value={address}
                onChangeText={text => {
                  setAddress(text);
                  if (errors.address)
                    setErrors(prev => ({ ...prev, address: '' }));
                }}
                editable={!loading}
              />
              {errors.address ? (
                <Text style={styles.errorText}>{errors.address}</Text>
              ) : null}
            </View>

            {/* Currency */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Currency *</Text>
              <TextInput
                style={[styles.input, errors.currency && styles.inputError]}
                placeholder="e.g. PKR, USD, EUR"
                placeholderTextColor="#8E8E93"
                value={currency}
                onChangeText={text => {
                  setCurrency(text);
                  if (errors.currency)
                    setErrors(prev => ({ ...prev, currency: '' }));
                }}
                editable={!loading}
              />
              {errors.currency ? (
                <Text style={styles.errorText}>{errors.currency}</Text>
              ) : null}
            </View>

            {/* Business Mode - Read Only */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Business Mode (Cannot be changed)</Text>
              <View style={[styles.input, styles.readOnlyInput]}>
                <Text style={styles.readOnlyText}>{getModeDisplay()}</Text>
              </View>
            </View>

            {/* Action Buttons - Stacked Vertically */}
            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Save Changes"
                    titleStyle={styles.saveButtonText}
                    onPress={handleSave}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default EditBusinessInfoScreen;
