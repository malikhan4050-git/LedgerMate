import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';
import type { RootState } from '../../redux/store';

const SimpleDashboardScreen = () => {
  const username = useSelector(
    (state: RootState) => state.session.user?.name,
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Welcome back, {username || 'User'}!
          </Text>
          <Text style={styles.headerSubtitle}>
            Here's a quick overview of your business activities.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SimpleDashboardScreen;