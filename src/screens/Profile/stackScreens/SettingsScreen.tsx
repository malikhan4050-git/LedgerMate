import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { useAlert } from '../../../hooks/useAlert';
import GradientButton from '../../../components/Buttons/GradientButton';
import styles from '../styles/stylesSettings';

const TaxSettingsScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Settings preferences
  const [autoSave, setAutoSave] = useState(true);
  const [receipts, setReceipts] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('appSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setAutoSave(parsed.autoSave !== undefined ? parsed.autoSave : true);
        setReceipts(parsed.receipts !== undefined ? parsed.receipts : true);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const settings = { autoSave, receipts };
      await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
      showAlert('Success', 'Settings saved successfully!', 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      showAlert('Error', 'Failed to save settings. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSettings();
    setRefreshing(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const SettingItem = ({
    icon,
    title,
    description,
    value,
    onValueChange,
  }: {
    icon: string;
    title: string;
    description: string;
    value: boolean;
    onValueChange: () => void;
  }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIconContainer}>
          <Icon name={icon} size={22} color="#1E90FF" />
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        trackColor={{ false: '#D1D1D6', true: '#4A90E2' }}
        thumbColor={value ? '#FFFFFF' : '#FFFFFF'}
        ios_backgroundColor="#D1D1D6"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );

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
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.subtitle}>
              Manage your app preferences
            </Text>
          </View>

          <View style={styles.container}>
            <SettingItem
              icon="save-outline"
              title="Auto-Save"
              description="Automatically save your entries"
              value={autoSave}
              onValueChange={() => setAutoSave(!autoSave)}
            />

            <SettingItem
              icon="receipt-outline"
              title="Digital Receipts"
              description="Generate receipts for transactions"
              value={receipts}
              onValueChange={() => setReceipts(!receipts)}
            />

            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Save Settings"
                    titleStyle={styles.saveButtonText}
                    onPress={saveSettings}
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

export default TaxSettingsScreen;