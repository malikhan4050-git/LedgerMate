import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  Switch,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAlert } from '../../../hooks/useAlert';
import GradientButton from '../../../components/Buttons/GradientButton';
import styles from '../styles/stylesNotification';

interface NotificationPreferences {
  pushNotifications: boolean;
  emailNotifications: boolean;
  transactionAlerts: boolean;
  promotionalOffers: boolean;
  appUpdates: boolean;
}

const NotificationSettingsScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    pushNotifications: true,
    emailNotifications: true,
    transactionAlerts: true,
    promotionalOffers: false,
    appUpdates: true,
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem('notificationPreferences');
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const savePreferences = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('notificationPreferences', JSON.stringify(preferences));
      showAlert('Success', 'Notification preferences updated successfully!', 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      showAlert('Error', 'Failed to save preferences. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleSwitch = (key: keyof NotificationPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPreferences();
    setRefreshing(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const NotificationItem = ({
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
    <View style={styles.notificationItem}>
      <View style={styles.notificationLeft}>
        <View style={styles.notificationIconContainer}>
          <Icon name={icon} size={22} color="#1E90FF" />
        </View>
        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{title}</Text>
          <Text style={styles.notificationDescription}>{description}</Text>
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
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.subtitle}>
              Manage your notification preferences
            </Text>
          </View>

          <View style={styles.container}>
            <NotificationItem
              icon="notifications-outline"
              title="Push Notifications"
              description="Receive push notifications"
              value={preferences.pushNotifications}
              onValueChange={() => toggleSwitch('pushNotifications')}
            />

            <NotificationItem
              icon="mail-outline"
              title="Email Notifications"
              description="Receive email notifications"
              value={preferences.emailNotifications}
              onValueChange={() => toggleSwitch('emailNotifications')}
            />

            <NotificationItem
              icon="card-outline"
              title="Transaction Alerts"
              description="Get alerts for transactions"
              value={preferences.transactionAlerts}
              onValueChange={() => toggleSwitch('transactionAlerts')}
            />

            <NotificationItem
              icon="megaphone-outline"
              title="Promotional Offers"
              description="Receive promotional offers"
              value={preferences.promotionalOffers}
              onValueChange={() => toggleSwitch('promotionalOffers')}
            />

            <NotificationItem
              icon="phone-portrait-outline"
              title="App Updates"
              description="Get notified about updates"
              value={preferences.appUpdates}
              onValueChange={() => toggleSwitch('appUpdates')}
            />

            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Save Preferences"
                    titleStyle={styles.saveButtonText}
                    onPress={savePreferences}
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

export default NotificationSettingsScreen;