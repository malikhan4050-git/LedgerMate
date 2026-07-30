import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { useAlert } from '../../../hooks/useAlert';
import styles from '../styles/stylesTermsPrivacy';

const TermsPrivacyScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch(() => {
      showAlert('Error', 'Unable to open link', 'error');
    });
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
            <Text style={styles.headerTitle}>Terms & Privacy</Text>
            <Text style={styles.subtitle}>
              View terms of service and privacy policy
            </Text>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.termsItem}
              onPress={() => handleLinkPress('https://yourwebsite.com/terms')}
              activeOpacity={0.7}
            >
              <View style={styles.termsItemLeft}>
                <View style={styles.termsIconContainer}>
                  <Icon name="document-text-outline" size={22} color="#1E90FF" />
                </View>
                <View>
                  <Text style={styles.termsTitle}>Terms of Service</Text>
                  <Text style={styles.termsDescription}>
                    Read our terms and conditions
                  </Text>
                </View>
              </View>
              <Icon name="open-outline" size={20} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.termsItem}
              onPress={() => handleLinkPress('https://yourwebsite.com/privacy')}
              activeOpacity={0.7}
            >
              <View style={styles.termsItemLeft}>
                <View style={styles.termsIconContainer}>
                  <Icon name="shield-outline" size={22} color="#1E90FF" />
                </View>
                <View>
                  <Text style={styles.termsTitle}>Privacy Policy</Text>
                  <Text style={styles.termsDescription}>
                    Learn how we handle your data
                  </Text>
                </View>
              </View>
              <Icon name="open-outline" size={20} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.termsItem}
              onPress={() => handleLinkPress('https://yourwebsite.com/cookies')}
              activeOpacity={0.7}
            >
              <View style={styles.termsItemLeft}>
                <View style={styles.termsIconContainer}>
                  <Icon name="cog-outline" size={22} color="#1E90FF" />
                </View>
                <View>
                  <Text style={styles.termsTitle}>Cookie Policy</Text>
                  <Text style={styles.termsDescription}>
                    Understand our cookie usage
                  </Text>
                </View>
              </View>
              <Icon name="open-outline" size={20} color="#C7C7CC" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default TermsPrivacyScreen;