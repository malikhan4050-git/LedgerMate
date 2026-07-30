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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAlert } from '../../../hooks/useAlert';
import GradientButton from '../../../components/Buttons/GradientButton';
import styles from '../styles/stylesAppearance';

type ThemeOption = 'Light' | 'Dark' | 'System';

const AppearanceScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('Light');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem('appTheme');
      if (saved) {
        setSelectedTheme(saved as ThemeOption);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const saveThemePreference = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('appTheme', selectedTheme);
      showAlert('Success', 'Theme preference saved successfully!', 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      showAlert('Error', 'Failed to save theme preference.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadThemePreference();
    setRefreshing(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const ThemeOption = ({
    label,
    icon,
    isSelected,
    onPress,
  }: {
    label: string;
    icon: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.themeOption, isSelected && styles.themeOptionSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.themeOptionLeft}>
        <View style={[styles.themeIconContainer, isSelected && styles.themeIconContainerSelected]}>
          <Icon name={icon} size={22} color={isSelected ? '#FFFFFF' : '#1E90FF'} />
        </View>
        <Text style={[styles.themeOptionText, isSelected && styles.themeOptionTextSelected]}>
          {label}
        </Text>
      </View>
      {isSelected && <Icon name="checkmark-circle" size={22} color="#1E90FF" />}
    </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Appearance</Text>
            <Text style={styles.subtitle}>
              Choose your app theme
            </Text>
          </View>

          <View style={styles.container}>
            <ThemeOption
              label="Light"
              icon="sunny-outline"
              isSelected={selectedTheme === 'Light'}
              onPress={() => setSelectedTheme('Light')}
            />

            <ThemeOption
              label="Dark"
              icon="moon-outline"
              isSelected={selectedTheme === 'Dark'}
              onPress={() => setSelectedTheme('Dark')}
            />

            <ThemeOption
              label="System"
              icon="phone-portrait-outline"
              isSelected={selectedTheme === 'System'}
              onPress={() => setSelectedTheme('System')}
            />

            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Save Theme"
                    titleStyle={styles.saveButtonText}
                    onPress={saveThemePreference}
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

export default AppearanceScreen;