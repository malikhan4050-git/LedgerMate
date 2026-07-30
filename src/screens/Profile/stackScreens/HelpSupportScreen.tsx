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
import styles from '../styles/stylesHelpSupport';

interface SupportItem {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

const HelpSupportScreen = () => {
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

  const supportItems: SupportItem[] = [
    {
      icon: 'help-circle-outline',
      title: 'FAQ',
      description: 'Frequently asked questions',
      onPress: () => showAlert('FAQ', 'FAQ section coming soon!', 'info'),
    },
    {
      icon: 'chatbubbles-outline',
      title: 'Contact Support',
      description: 'Get help from our support team',
      onPress: () => showAlert('Support', 'Support team coming soon!', 'info'),
    },
    {
      icon: 'mail-outline',
      title: 'Email Us',
      description: 'Send us an email',
      onPress: () => {
        Linking.openURL('mailto:support@ledgermate.com');
      },
    },
    {
      icon: 'call-outline',
      title: 'Call Us',
      description: 'Call our support team',
      onPress: () => {
        Linking.openURL('tel:+923001234567');
      },
    },
    {
      icon: 'document-text-outline',
      title: 'User Guide',
      description: 'Read the user guide',
      onPress: () => showAlert('User Guide', 'User guide coming soon!', 'info'),
    },
  ];

  const SupportItem = ({ icon, title, description, onPress }: SupportItem) => (
    <TouchableOpacity
      style={styles.supportItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.supportItemLeft}>
        <View style={styles.supportIconContainer}>
          <Icon name={icon} size={22} color="#1E90FF" />
        </View>
        <View style={styles.supportTextContainer}>
          <Text style={styles.supportTitle}>{title}</Text>
          <Text style={styles.supportDescription}>{description}</Text>
        </View>
      </View>
      <Icon name="chevron-forward-outline" size={20} color="#C7C7CC" />
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
            <Text style={styles.headerTitle}>Help & Support</Text>
            <Text style={styles.subtitle}>
              Get help and contact support
            </Text>
          </View>

          <View style={styles.container}>
            {supportItems.map((item, index) => (
              <SupportItem key={index} {...item} />
            ))}

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

export default HelpSupportScreen;