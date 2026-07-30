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
import styles from '../styles/stylesLanguage';

interface LanguageOption {
  id: string;
  label: string;
  nativeLabel: string;
  icon: string;
}

const languages: LanguageOption[] = [
  { id: 'en', label: 'English', nativeLabel: 'English', icon: 'flag-outline' },
  { id: 'ur', label: 'Urdu', nativeLabel: 'اردو', icon: 'flag-outline' },
  { id: 'es', label: 'Spanish', nativeLabel: 'Español', icon: 'flag-outline' },
  { id: 'fr', label: 'French', nativeLabel: 'Français', icon: 'flag-outline' },
  { id: 'ar', label: 'Arabic', nativeLabel: 'العربية', icon: 'flag-outline' },
];

const LanguageScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  const loadLanguagePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem('appLanguage');
      if (saved) {
        setSelectedLanguage(saved);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const saveLanguagePreference = async () => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('appLanguage', selectedLanguage);
      showAlert('Success', 'Language preference saved successfully!', 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      showAlert('Error', 'Failed to save language preference.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLanguagePreference();
    setRefreshing(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const LanguageOption = ({ language }: { language: LanguageOption }) => {
    const isSelected = selectedLanguage === language.id;
    return (
      <TouchableOpacity
        style={[styles.languageOption, isSelected && styles.languageOptionSelected]}
        onPress={() => setSelectedLanguage(language.id)}
        activeOpacity={0.7}
      >
        <View style={styles.languageOptionLeft}>
          <View style={[styles.languageIconContainer, isSelected && styles.languageIconContainerSelected]}>
            <Icon name={language.icon} size={22} color={isSelected ? '#FFFFFF' : '#1E90FF'} />
          </View>
          <View>
            <Text style={[styles.languageOptionText, isSelected && styles.languageOptionTextSelected]}>
              {language.label}
            </Text>
            <Text style={styles.languageOptionNative}>
              {language.nativeLabel}
            </Text>
          </View>
        </View>
        {isSelected && <Icon name="checkmark-circle" size={22} color="#1E90FF" />}
      </TouchableOpacity>
    );
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
            <Text style={styles.headerTitle}>Language</Text>
            <Text style={styles.subtitle}>
              Select your preferred language
            </Text>
          </View>

          <View style={styles.container}>
            {languages.map((language) => (
              <LanguageOption key={language.id} language={language} />
            ))}

            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title="Save Language"
                    titleStyle={styles.saveButtonText}
                    onPress={saveLanguagePreference}
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

export default LanguageScreen;