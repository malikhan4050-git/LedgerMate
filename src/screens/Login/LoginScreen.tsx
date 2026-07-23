import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch } from '../../redux/hooks';
import { setSession } from '../../redux/slices/sessionSlice';
import { RootStackParamList } from '../../navigation/RootNavigator';

import { validateLoginForm } from '../../utils/validators';
import AppLogo from '../../components/Logo/AppLogo';
import Header from '../../components/Header/Header';
import CustomInput from '../../components/Inputs/CustomInput';
import GradientButton from '../../components/Buttons/GradientButton';
import { useAlert } from '../../hooks/useAlert';

import styles from './styles';
import api from '../../api/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { showAlert } = useAlert();
  const [data, setData] = useState({
    emailORphoneNo: '',
    password: '',
  });

  const [errors, setErrors] = useState<{
    emailORphoneNo?: string;
    password?: string;
  }>({});

  const [showPassword] = useState(false);

  const handleChange = (key: keyof typeof data, value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }));

    // Remove error while typing
    setErrors(prev => ({
      ...prev,
      [key]: '',
    }));
  };

  const handleLogin = async () => {
    const validationErrors = validateLoginForm(data);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await api.post('/auth/login', data);
      console.log(response);

      const responsePayload = response?.data?.result ?? response?.data ?? {};
      const token = responsePayload.token ?? null;
      const user = responsePayload.user ?? null;
      const business = responsePayload.business ?? null;

      await Promise.all([
        AsyncStorage.setItem('token', token ?? ''),
        AsyncStorage.setItem('user', JSON.stringify(user ?? null)),
        AsyncStorage.setItem('business', JSON.stringify(business ?? null)),
      ]);

      dispatch(
        setSession({
          token,
          user,
          business,
        }),
      );

      if (!business || business.success === false) {
        navigation.replace('BusinessDetails');
      } else {
        navigation.replace('App');
      }
    } catch (error: any) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      const errorMessage = error.response?.data?.message;

      if (
        error.response?.status === 400 &&
        errorMessage === 'Business details not found'
      ) {
        navigation.replace('BusinessDetails');
        return;
      }

      showAlert(
        'Login Failed',
        errorMessage || 'Something went wrong.',
        'error',
      );
    }
  };

//   const handleLogin = async () => {
//   // Bypass everything - just navigate directly
//   navigation.replace('App'); // or 'BusinessDetails' if you want to test that screen
// };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <AppLogo />
        </View>

        <Header title="Welcome Back" subtitle="Login to your account" />

        <View style={styles.formContainer}>
          <CustomInput
            placeholder="Email or Phone Number"
            keyboardType="default"
            autoCapitalize="none"
            value={data.emailORphoneNo}
            onChangeText={text => handleChange('emailORphoneNo', text)}
            error={errors.emailORphoneNo}
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

          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }: { pressed: boolean }) => [
              styles.forgotContainer,
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={() => {
              // Add forgot password action here if needed
            }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>

          <GradientButton title="Login" onPress={handleLogin} />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don't have an account?</Text>

          <Pressable
            android_ripple={{ color: 'transparent' }}
            style={({ pressed }: { pressed: boolean }) => [
              { transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.signupText}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
