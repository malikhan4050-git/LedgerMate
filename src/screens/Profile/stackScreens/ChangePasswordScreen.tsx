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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { useAlert } from '../../../hooks/useAlert';
import GradientButton from '../../../components/Buttons/GradientButton';
import api from '../../../api/axios';
import styles from '../styles/stylesChangePassword';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [errors, setErrors] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Password strength indicators
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isStrongPassword = hasMinLength && hasUpperCase && hasLowerCase && hasNumber;

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };

    if (!oldPassword || oldPassword.trim() === '') {
      newErrors.oldPassword = 'Please enter your current password';
      isValid = false;
    }

    if (!newPassword || newPassword.trim() === '') {
      newErrors.newPassword = 'Please enter a new password';
      isValid = false;
    } else if (!isStrongPassword) {
      newErrors.newPassword = 'Password must meet all requirements below';
      isValid = false;
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Please confirm your new password';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdatePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      
      // Call API to change password
      const response = await api.post(
        '/auth/change-password',
        {
          oldPassword: oldPassword.trim(),
          newPassword: newPassword.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Password change response:', response.data);

      showAlert('Success', 'Password changed successfully!', 'success');

      // Clear fields
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error: any) {
      console.error('Change password error:', error);
      
      // Get error message from response
      const errorMessage = error?.response?.data?.message || 'Failed to change password. Please try again.';
      
      // Handle specific error messages from backend
      if (errorMessage.toLowerCase().includes('current password is incorrect') || 
          errorMessage.toLowerCase().includes('old password is incorrect')) {
        setErrors((prev) => ({ ...prev, oldPassword: 'Current password is incorrect' }));
      } else if (errorMessage.toLowerCase().includes('new password must be different')) {
        setErrors((prev) => ({ ...prev, newPassword: 'New password must be different from current password' }));
      } else if (errorMessage.toLowerCase().includes('authentication required')) {
        showAlert('Session Expired', 'Please login again', 'error');
        // Navigate to login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' as never }],
        });
      } else {
        showAlert('Error', errorMessage, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
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
          height: Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
          paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
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
            <Text style={styles.headerTitle}>Change Password</Text>
            <Text style={styles.subtitle}>
              Update your account password
            </Text>
          </View>

          <View style={styles.container}>
            {/* Current Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Current Password *</Text>
              <View style={[styles.inputContainer, errors.oldPassword && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter current password"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry={!showOldPassword}
                  value={oldPassword}
                  onChangeText={(text) => {
                    setOldPassword(text);
                    if (errors.oldPassword) setErrors((prev) => ({ ...prev, oldPassword: '' }));
                  }}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowOldPassword(!showOldPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showOldPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color="#8E8E93"
                  />
                </TouchableOpacity>
              </View>
              {errors.oldPassword ? (
                <Text style={styles.errorText}>{errors.oldPassword}</Text>
              ) : null}
            </View>

            {/* New Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>New Password *</Text>
              <View style={[styles.inputContainer, errors.newPassword && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                    if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }));
                  }}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color="#8E8E93"
                  />
                </TouchableOpacity>
              </View>
              {errors.newPassword ? (
                <Text style={styles.errorText}>{errors.newPassword}</Text>
              ) : null}
            </View>

            {/* Confirm New Password */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Confirm New Password *</Text>
              <View style={[styles.inputContainer, errors.confirmPassword && styles.inputError]}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                  }}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color="#8E8E93"
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword ? (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              ) : null}
            </View>

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password Requirements:</Text>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasMinLength ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasMinLength ? '#2E7D32' : '#8E8E93'}
                />
                <Text style={[styles.requirementText, hasMinLength && styles.requirementMet]}>
                  At least 8 characters
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasUpperCase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasUpperCase ? '#2E7D32' : '#8E8E93'}
                />
                <Text style={[styles.requirementText, hasUpperCase && styles.requirementMet]}>
                  Include uppercase letter (A-Z)
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasLowerCase ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasLowerCase ? '#2E7D32' : '#8E8E93'}
                />
                <Text style={[styles.requirementText, hasLowerCase && styles.requirementMet]}>
                  Include lowercase letter (a-z)
                </Text>
              </View>
              <View style={styles.requirementItem}>
                <Icon
                  name={hasNumber ? 'checkmark-circle' : 'ellipse-outline'}
                  size={16}
                  color={hasNumber ? '#2E7D32' : '#8E8E93'}
                />
                <Text style={[styles.requirementText, hasNumber && styles.requirementMet]}>
                  Include at least one number (0-9)
                </Text>
              </View>
            </View>

            {/* Action Buttons - Stacked Vertically */}
            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Update Password"
                    titleStyle={styles.saveButtonText}
                    onPress={handleUpdatePassword}
                    disabled={!isStrongPassword}
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

export default ChangePasswordScreen;