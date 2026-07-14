import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';

import styles from './stylesAdvanceDashboard';
import type { RootState } from '../../redux/store';

const AdvanceDashboardScreen = () => {
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
          <Text style={styles.headerTitle}>Advance Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Welcome back, {username || 'User'}!
          </Text>
          <Text style={styles.headerSubtitle}>
            Here's your advance business analytics.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdvanceDashboardScreen;