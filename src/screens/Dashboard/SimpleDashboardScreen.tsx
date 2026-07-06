import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import DashboardLogo from '../../components/Logo/DashboardLogo';
import styles from './styles';
import type { RootState } from '../../redux/store';

const SimpleDashboardScreen = () => {
  const username = useSelector(
    (state: RootState) => state.session.user?.name,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <DashboardLogo />
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>
          Welcome back, {username || 'User'}!
        </Text>

        <Text style={styles.subtitle}>
          Here's your business at a glance.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SimpleDashboardScreen;