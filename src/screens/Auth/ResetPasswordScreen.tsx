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
  StatusBar,
  Linking,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAlert } from '../../hooks/useAlert';
import GradientButton from '../../components/Buttons/GradientButton';
import AppLogo from '../../components/Logo/AppLogo';
import { resetPassword } from '../../services/authApi';
import styles from './stylesAuth';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { showAlert } = useAlert();

  const token = (route.params as any)?.token || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [tokenValid, setTokenValid] = useState<boolean>(!!token);

  const hasNavigated = useRef(false);

  useEffect(() => {
    const handleDeepLink = async () => {
      if (hasNavigated.current) return;

      const url = await Linking.getInitialURL();
      if (url) {
        console.log('Initial URL:', url);
        const match = url.match(/reset-password\/([^/?]+)/);
        if (match && match[1]) {
          const token = match[1];
          setTokenValid(true);
          hasNavigated.current = true;
          navigation.reset({
            index: 0,
            routes: [{ 
              name: 'ResetPassword' as never, 
              params: { token } 
            }],
          });
        }
      }
    };

    handleDeepLink();

    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Deep link received:', url);
      const match = url.match(/reset-password\/([^/?]+)/);
      if (match && match[1]) {
        const token = match[1];
        setTokenValid(true);
        hasNavigated.current = true;
        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'ResetPassword' as never, 
            params: { token } 
          }],
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [navigation]);

  useEffect(() => {
    if (!token && !tokenValid) {
      setTokenValid(false);
    }
  }, [token, tokenValid]);

  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isStrongPassword =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber;

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      newPassword: '',
      confirmPassword: '',
    };

    if (!newPassword || newPassword.trim() === '') {
      newErrors.newPassword = 'Please enter a new password';
      isValid = false;
    } else if (!isStrongPassword) {
      newErrors.newPassword = 'Password must meet all requirements below';
      isValid = false;
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) {
      return;
    }

    const actualToken = token || (route.params as any)?.token || '';

    if (!actualToken) {
      showAlert(
        'Error',
        'Invalid or missing reset token. Please request a new reset link.',
        'error',
      );
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(actualToken, newPassword.trim());
      console.log('Password reset successful:', response);

      showAlert(
        'Success',
        'Password reset successfully! Please login with your new password.',
        'success',
      );

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      }, 2000);
    } catch (error: any) {
      console.error('Reset password error:', error);

      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        'Failed to reset password. Please try again.';

      if (status === 400) {
        if (message.toLowerCase().includes('expired')) {
          showAlert(
            'Link Expired',
            'The reset link has expired. Please request a new one.',
            'error',
          );
        } else if (
          message.toLowerCase().includes('invalid') ||
          message.toLowerCase().includes('token')
        ) {
          showAlert(
            'Invalid Token',
            'The reset token is invalid. Please request a new reset link.',
            'error',
          );
        } else {
          showAlert('Error', message, 'error');
        }
      } else if (status === 404) {
        showAlert(
          'Not Found',
          'No account found. Please request a new reset link.',
          'error',
        );
      } else {
        showAlert('Error', message, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
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
              <Text style={styles.headerTitle}>Reset Password</Text>
              <Text style={styles.headerSubtitle}>
                Enter your new password below
              </Text>
            </View>

            {tokenValid || token ? (
              <View style={styles.tokenStatusContainer}>
                <Icon name="checkmark-circle" size={20} color="#2E7D32" />
                <Text style={styles.tokenStatusText}>Reset token verified</Text>
              </View>
            ) : (
              <View
                style={[styles.tokenStatusContainer, styles.tokenStatusError]}
              >
                <Icon name="alert-circle" size={20} color="#C62828" />
                <Text style={styles.tokenStatusErrorText}>
                  No reset token found
                </Text>
              </View>
            )}

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>New Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.newPassword && styles.inputError,
                  ]}
                  placeholder="Enter new password"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry={!showPassword}
                  value={newPassword}
                  onChangeText={text => {
                    setNewPassword(text);
                    if (errors.newPassword)
                      setErrors(prev => ({ ...prev, newPassword: '' }));
                  }}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color="#8E8E93"
                  />
                </TouchableOpacity>
              </View>
              {errors.newPassword ? (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              ) : null}
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    errors.confirmPassword && styles.inputError,
                  ]}
                  placeholder="Confirm new password"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={text => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword)
                      setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    name={
                      showConfirmPassword ? 'eye-outline' : 'eye-off-outline'
                    }
                    size={22}
                    color="#8E8E93"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>
                Password Requirements:
              </Text>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasMinLength ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasMinLength ? '#2E7D32' : '#8E8E93'}
                />
                <Text
                  style={[
                    styles.requirementText,
                    hasMinLength && styles.requirementMet,
                  ]}
                >
                  At least 8 characters
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasUpperCase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasUpperCase ? '#2E7D32' : '#8E8E93'}
                />
                <Text
                  style={[
                    styles.requirementText,
                    hasUpperCase && styles.requirementMet,
                  ]}
                >
                  Include uppercase letter (A-Z)
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasLowerCase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasLowerCase ? '#2E7D32' : '#8E8E93'}
                />
                <Text
                  style={[
                    styles.requirementText,
                    hasLowerCase && styles.requirementMet,
                  ]}
                >
                  Include lowercase letter (a-z)
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasNumber ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasNumber ? '#2E7D32' : '#8E8E93'}
                />
                <Text
                  style={[
                    styles.requirementText,
                    hasNumber && styles.requirementMet,
                  ]}
                >
                  Include at least one number (0-9)
                </Text>
              </View>
            </View>

            <View style={[styles.buttonWrapper, { marginTop: 10 }]}>
              {loading ? (
                <ActivityIndicator size="large" color="#1E90FF" />
              ) : (
                <GradientButton
                  title="Reset Password"
                  titleStyle={styles.buttonText}
                  onPress={handleResetPassword}
                  disabled={!isStrongPassword || !tokenValid}
                />
              )}
            </View>

            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.bottomContainer}
            >
              <Text style={styles.bottomText}>Back to </Text>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default ResetPasswordScreen;