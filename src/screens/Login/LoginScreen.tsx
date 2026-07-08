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

import { validateLoginForm } from '../../utils/validators';
import AppLogo from '../../components/Logo/AppLogo';
import Header from '../../components/Header/Header';
import CustomInput from '../../components/Inputs/CustomInput';
import GradientButton from '../../components/Buttons/GradientButton';

import styles from './styles';
import api from '../../api/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
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

      const { token, user, business } = response.data.result;
      

      await Promise.all([
        AsyncStorage.setItem('token', token),
        AsyncStorage.setItem('user', JSON.stringify(user)),
        AsyncStorage.setItem('business', JSON.stringify(business)),
      ]);

      dispatch(
        setSession({
          token,
          user,
          business,
        }),
      );

      navigation.replace('App');
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

      Alert.alert(
        'Login Failed',
        errorMessage || 'Something went wrong.',
      );
    }
  };

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
