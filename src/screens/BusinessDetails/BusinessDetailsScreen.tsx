import React, { useState } from 'react';
import { View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../redux/hooks';
import { setSession } from '../../redux/slices/sessionSlice';
import { RootStackParamList } from '../../navigation/RootNavigator';

import AppLogo from '../../components/Logo/AppLogo';
import Header from '../../components/Header/Header';
import CustomInput from '../../components/Inputs/CustomInput';
import GradientButton from '../../components/Buttons/GradientButton';
import ToggleSelector from '../../components/Toggle/ToggleSelector';

import styles from './styles';
import api from '../../api/axios';
import { validateBusinessForm } from '../../utils/validators';

type Props = NativeStackScreenProps<RootStackParamList, 'BusinessDetails'>;

const BusinessDetailsScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [business, setBusiness] = useState({
    businessName: '',
    ownerName: '',
    phoneNo: '',
    businessType: '',
    address: '',
    mode: 'simple' as 'simple' | 'advanced',
    currency: '',
  });

  const [errors, setErrors] = useState<{
    businessName?: string;
    ownerName?: string;
    phoneNo?: string;
    businessType?: string;
    address?: string;
    currency?: string;
  }>({});

  const handleChange = (key: keyof typeof business, value: string) => {
    setBusiness(prev => ({
      ...prev,
      [key]: value,
    }));

    if (key !== 'mode') {
      setErrors(prev => ({
        ...prev,
        [key]: '',
      }));
    }
  };

  const handleCreateBusiness = async () => {
    const validationErrors = validateBusinessForm(business);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      const userString = await AsyncStorage.getItem('user');
      const savedUser = userString ? JSON.parse(userString) : null;

      const response = await api.post('/business', business, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const savedBusiness = response.data?.result?.business ?? business;

      if (token && savedUser) {
        await AsyncStorage.setItem('business', JSON.stringify(savedBusiness));

        dispatch(
          setSession({
            token,
            user: savedUser,
            business: savedBusiness,
          }),
        );
      }

      navigation.replace('App');
    } catch (error: any) {
      console.log(error.response?.status);
      console.log(error.response?.data);
      console.log(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}

        <View style={styles.logoContainer}>
          <AppLogo />
        </View>

        {/* Header */}

        <Header
          title="Setup Business"
          subtitle="Configure your digital ledger book details"
        />

        {/* Form */}

        <View style={styles.formContainer}>
          <CustomInput
            placeholder="Business Name"
            value={business.businessName}
            onChangeText={text => handleChange('businessName', text)}
            error={errors.businessName}
          />

          <CustomInput
            placeholder="Owner Name"
            value={business.ownerName}
            onChangeText={text => handleChange('ownerName', text)}
            error={errors.ownerName}
          />

          <CustomInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={business.phoneNo}
            onChangeText={text => handleChange('phoneNo', text)}
            error={errors.phoneNo}
          />

          <CustomInput
            placeholder="Business Type"
            value={business.businessType}
            onChangeText={text => handleChange('businessType', text)}
            error={errors.businessType}
          />

          <CustomInput
            placeholder="Address"
            value={business.address}
            onChangeText={text => handleChange('address', text)}
            error={errors.address}
          />

          <CustomInput
            placeholder="Currency"
            value={business.currency}
            onChangeText={text => handleChange('currency', text)}
            error={errors.currency}
          />
          <ToggleSelector
            title="Ledger Mode"
            selectedValue={business.mode}
            leftTitle="Simple"
            rightTitle="Advanced"
            leftSubtitle="Basic ledger for daily entries" // ✅ Add this
            rightSubtitle="Detailed reports & analytics" // ✅ Add this
            leftIcon="receipt-outline" // ✅ Add this
            rightIcon="diamond-outline" // ✅ Add this
            onValueChange={value => handleChange('mode', value)}
          />
          <GradientButton
            title="Create Business Book"
            onPress={handleCreateBusiness}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BusinessDetailsScreen;
