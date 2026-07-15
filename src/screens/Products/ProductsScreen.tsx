import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import GradientButton from '../../components/Buttons/GradientButton';
import AddProductModal from './components/AddProductModal';
import styles from './styles';
import type { RootState } from '../../redux/store';

const ProductsScreen = () => {
  const business = useSelector((state: RootState) => state.session.business);
  const isSimpleUser = business?.mode === 'simple';

  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // TODO: Fetch products from API
    setRefreshing(false);
  };

  // Open modal
  const handleAddProduct = () => {
    setModalVisible(true);
  };

  // Handle save from modal
  const handleModalSave = (productData: {
    name: string;
    price: string;
    stock: string;
    category: string;
  }) => {
    console.log('Product saved:', productData);
    // TODO: Add product to list or call API
    setModalVisible(false);
  };

  // Close modal
  const handleModalClose = () => {
    setModalVisible(false);
  };

  // If simple user, show locked screen
  if (isSimpleUser) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Products</Text>
            <Text style={styles.headerSubtitle}>
              Upgrade to premium to manage your products
            </Text>
          </View>

          <View style={styles.lockedContainer}>
            <Text style={styles.lockedIcon}>🔒</Text>
            <Text style={styles.lockedTitle}>Premium Feature</Text>
            <Text style={styles.lockedDescription}>
              Upgrade to premium to add, edit, and manage your products inventory.
            </Text>
            <View style={styles.upgradeButtonWrapper}>
              <GradientButton
                title="Upgrade Now"
                titleStyle={styles.upgradeButtonText}
                onPress={() => console.log('Upgrade pressed')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  // Advanced/Full Products Screen UI
  return (
    <ScrollView
      style={styles.container}
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <Text style={styles.headerSubtitle}>Manage your inventory here</Text>
      </View>

      {/* Add Product Button */}
      <View style={styles.addButtonWrapper}>
        <GradientButton
          title="+ Add Product"
          titleStyle={styles.addButtonText}
          onPress={handleAddProduct}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#8E8E93"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== '' && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close-circle" size={20} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>

      {/* Empty State - UI Only */}
      <View style={styles.emptyContainer}>
        <Icon name="cube-outline" size={60} color="#D1D1D6" />
        <Text style={styles.emptyText}>No Products Yet</Text>
        <Text style={styles.emptySubtext}>
          Start by adding your first product
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Total Products: 0
        </Text>
      </View>

      {/* Add Product Modal */}
      <AddProductModal
        visible={modalVisible}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </ScrollView>
  );
};

export default ProductsScreen;