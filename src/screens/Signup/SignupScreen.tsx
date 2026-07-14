import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../redux/hooks';
import { setSession } from '../../redux/slices/sessionSlice';
import { RootStackParamList } from '../../navigation/RootNavigator';

import { validateSignupForm } from '../../utils/validators';
import AppLogo from '../../components/Logo/AppLogo';
import Header from '../../components/Header/Header';
import CustomInput from '../../components/Inputs/CustomInput';
import GradientButton from '../../components/Buttons/GradientButton';

import styles from './styles';
import api from '../../api/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword] = useState(false);
  const [showConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phoneNo?: string;
    password?: string;
    confirmPassword?: string;
    agree?: string;
  }>({});

  const handleChange = (key: keyof typeof data, value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [key]: '',
    }));
  };

  const handleSignup = async () => {
    const validationErrors = validateSignupForm(data, agree);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await api.post('/auth/signup', data);

      const { token, user } = response.data.result;

      // Persist auth data locally
      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('user', JSON.stringify(user)),
      ]);

      dispatch(
        setSession({
          token,
          user,
          business: null,
        }),
      );

      console.log('Signup Successful');
      console.log('Token:', token);
      console.log('User:', user);

      // Go to business details
      navigation.replace('BusinessDetails');
    } catch (error: any) {
      console.log('Status:', error.response?.status);
      console.log('Data:', error.response?.data);
      console.log('Message:', error.message);

      Alert.alert(
        'Signup Failed',
        error.response?.data?.message || 'Something went wrong.',
      );
    }
  };


  // const handleSignup = async () => {
  //   navigation.replace('BusinessDetails')
  // }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.logoContainer}>
          <AppLogo />
        </View>

        <Header title="Create Your Account" subtitle="Join LedgerMate today" />

        <View style={styles.formContainer}>
          <CustomInput
            placeholder="Full Name"
            value={data.name}
            onChangeText={text => handleChange('name', text)}
            error={errors.name}
          />

          <CustomInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={data.email}
            onChangeText={text => handleChange('email', text)}
            error={errors.email}
          />

          <CustomInput
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={data.phoneNo}
            onChangeText={text => handleChange('phoneNo', text)}
            error={errors.phoneNo}
          />

          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={data.password}
              onChangeText={text => handleChange('password', text)}
              error={errors.password}
            />
          </View>

          <View style={styles.passwordContainer}>
            <CustomInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={data.confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
              error={errors.confirmPassword}
            />
          </View>

          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }: { pressed: boolean }) => [
              styles.checkboxContainer,
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={() => {
              setAgree(prev => !prev);

              setErrors(prev => ({
                ...prev,
                agree: '',
              }));
            }}
          >
            <View style={[styles.checkbox, agree && styles.checkboxSelected]} />

            <Text style={styles.checkboxText}>
              I agree to the <Text style={styles.link}>Terms of Service</Text>{' '}
              and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </Pressable>

          {errors.agree ? (
            <Text
              style={styles.agreeError}
            >
              {errors.agree}
            </Text>
          ) : null}
          <GradientButton title="Sign Up" onPress={handleSignup} />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Already have an account?</Text>

          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }: { pressed: boolean }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
