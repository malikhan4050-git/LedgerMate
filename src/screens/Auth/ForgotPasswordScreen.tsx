import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAlert } from '../../hooks/useAlert';
import GradientButton from '../../components/Buttons/GradientButton';
import AppLogo from '../../components/Logo/AppLogo';
import api from '../../api/axios';
import styles from './stylesAuth';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email || email.trim() === '') {
      setError('Please enter your email address');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendResetLink = async () => {
    if (!validateEmail()) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/forgot-password', {
        email: email.trim(),
      });

      console.log('Reset link sent:', response.data);
      
      showAlert(
        'Check Your Email',
        'We have sent a password reset link to your email address. Please check your inbox.',
        'success'
      );
      
      // Navigate back to login after success
      setTimeout(() => {
        navigation.goBack();
      }, 3000);
      
    } catch (error: any) {
      console.error('Forgot password error:', error);
      const message = error?.response?.data?.message || 'Failed to send reset link. Please try again.';
      showAlert('Error', message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
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
            <View style={styles.logoContainer}>
              <AppLogo />
            </View>

            <View style={styles.header}>
              <Text style={styles.headerTitle}>Forgot Password</Text>
              <Text style={styles.headerSubtitle}>
                Enter your email address and we'll send you a link to reset your password
              </Text>
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError('');
                }}
                editable={!loading}
              />
              {error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : null}
            </View>

            <View style={styles.buttonWrapper}>
              {loading ? (
                <ActivityIndicator size="large" color="#1E90FF" />
              ) : (
                <GradientButton
                  title="Send Reset Link"
                  titleStyle={styles.buttonText}
                  onPress={handleSendResetLink}
                />
              )}
            </View>

            <TouchableOpacity onPress={handleGoBack} style={styles.bottomContainer}>
              <Text style={styles.bottomText}>Remember your password? </Text>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPasswordScreen;