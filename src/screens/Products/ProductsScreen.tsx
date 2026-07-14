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
          <Text style={styles.headerTitle}>Products</Text>
          <Text style={styles.headerSubtitle}>
            Here is your whole products listing. You can add, edit, or delete products as needed. 
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SimpleDashboardScreen;