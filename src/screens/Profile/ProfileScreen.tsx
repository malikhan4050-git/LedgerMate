import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { useAlert } from '../../hooks/useAlert';
import ProfileMenuItem from './components/ProfileMenuItem';
import UserCard from './components/UserCard';
import styles from './styles';
import type { RootState } from '../../redux/store';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();
  const [refreshing, setRefreshing] = useState(false);

  const user = useSelector((state: RootState) => state.session.user);
  const business = useSelector((state: RootState) => state.session.business);
  const isAdvanceUser = business?.mode === 'advanced';

  console.log('User data from Redux:', user); // Debug log

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const handleLogout = () => {
    showAlert(
      'Logout',
      'Are you sure you want to logout?',
      'warning'
    );
  };

  const handleMenuItemPress = (item: string) => {
    console.log('Pressed:', item);
  };

  return (
    <ScrollView
      style={styles.container}
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
        <Text style={styles.headerTitle}>My Profile</Text>
        <Text style={styles.headerSubtitle}>
          Manage your account and business details
        </Text>
      </View>

      <UserCard
        name={user?.name || 'User'}
        email={user?.email || 'user@example.com'}
        phone={user?.phoneNo || '+92 300 1234567'}
        plan={isAdvanceUser ? 'Advance Plan' : 'Simple Plan'}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <ProfileMenuItem
          icon="person-outline"
          title="Personal Information"
          subtitle="Update your personal details"
          onPress={() => handleMenuItemPress('Personal Information')}
        />
        <ProfileMenuItem
          icon="business-outline"
          title="Business Information"
          subtitle="View and update business details"
          onPress={() => handleMenuItemPress('Business Information')}
        />
        <ProfileMenuItem
          icon="lock-closed-outline"
          title="Change Password"
          subtitle="Update your account password"
          onPress={() => handleMenuItemPress('Change Password')}
        />
        <ProfileMenuItem
          icon="notifications-outline"
          title="Notifications"
          subtitle="Manage your notification preferences"
          onPress={() => handleMenuItemPress('Notifications')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <ProfileMenuItem
          icon="color-palette-outline"
          title="Appearance"
          subtitle="Choose app theme"
          rightText="Light"
          onPress={() => handleMenuItemPress('Appearance')}
        />
        <ProfileMenuItem
          icon="globe-outline"
          title="Language"
          subtitle="Select your preferred language"
          rightText="English"
          onPress={() => handleMenuItemPress('Language')}
        />
        <ProfileMenuItem
          icon="settings-outline"
          title="Tax & Settings"
          subtitle="Manage tax and app preferences"
          onPress={() => handleMenuItemPress('Tax & Settings')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & More</Text>
        <ProfileMenuItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help and contact support"
          onPress={() => handleMenuItemPress('Help & Support')}
        />
        <ProfileMenuItem
          icon="document-text-outline"
          title="Terms & Privacy"
          subtitle="View terms of service and privacy policy"
          onPress={() => handleMenuItemPress('Terms & Privacy')}
        />
        <ProfileMenuItem
          icon="log-out-outline"
          title="Logout"
          subtitle="Sign out from your account"
          isLogout={true}
          onPress={handleLogout}
        />
      </View>

      <View style={styles.footerSpacing} />
    </ScrollView>
  );
};

export default ProfileScreen;