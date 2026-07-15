import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';
import type { RootState } from '../../redux/store';

const ProductsScreen = () => {
  // Get user type from Redux
  const business = useSelector((state: RootState) => state.session.business);
  const isSimpleUser = business?.mode === 'simple';

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Products</Text>
          <Text style={styles.headerSubtitle}>
            {isSimpleUser 
              ? 'Upgrade to premium to manage your products' 
              : 'Manage your inventory here'}
          </Text>
        </View>

        {isSimpleUser ? (
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedIcon}>🔒</Text>
            <Text style={styles.lockedTitle}>Premium Feature</Text>
            <Text style={styles.lockedDescription}>
              Upgrade to premium to add, edit, and manage your products inventory.
            </Text>
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              📦 Products list will appear here
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;