import React, { useState, useEffect } from 'react';
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
import { ActivityIndicator, Alert } from 'react-native'; // Add ActivityIndicator and Alert
import {
  deleteProduct,
  ProductResult,
  getProducts,
} from '../../services/productsApi';

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

  const [products, setProducts] = useState<ProductResult[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isSimpleUser) {
      fetchProducts();
    }
  }, [isSimpleUser]);

  // Filter products based on search
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.category.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response);
      setFilteredProducts(response);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      Alert.alert('Error', 'Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  // Handle delete product
  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteProduct(id);
              Alert.alert('Success', 'Product deleted successfully');
              await fetchProducts(); // Refresh list
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete product');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ],
    );
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
    fetchProducts();
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
              Upgrade to premium to add, edit, and manage your products
              inventory.
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
        <Icon
          name="search-outline"
          size={20}
          color="#8E8E93"
          style={styles.searchIcon}
        />
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : filteredProducts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="cube-outline" size={60} color="#D1D1D6" />
          <Text style={styles.emptyText}>
            {searchText !== '' ? 'No products found' : 'No Products Yet'}
          </Text>
          <Text style={styles.emptySubtext}>
            {searchText !== ''
              ? 'Try searching with different keywords'
              : 'Start by adding your first product'}
          </Text>
        </View>
      ) : (
        filteredProducts.map(product => (
          <View key={product._id || product.id} style={styles.productCard}>
            <View style={styles.productCardHeader}>
              <View style={styles.productIconContainer}>
                <Icon name="cube-outline" size={24} color="#1E90FF" />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
              </View>
              <View style={styles.productActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    Alert.alert('Edit', `Edit "${product.name}" coming soon`)
                  }
                >
                  <Icon name="pencil-outline" size={18} color="#1E90FF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    handleDelete(product._id || product.id || '', product.name)
                  }
                  disabled={isDeleting}
                >
                  <Icon name="trash-outline" size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productCardBody}>
              <View style={styles.productDetail}>
                <Text style={styles.productDetailLabel}>Price</Text>
                <Text style={styles.productDetailValue}>
                  PKR {product.price}
                </Text>
              </View>
              <View style={styles.productDivider} />
              <View style={styles.productDetail}>
                <Text style={styles.productDetailLabel}>Stock</Text>
                <Text
                  style={[
                    styles.productDetailValue,
                    product.stock < 10 ? styles.lowStock : styles.inStock,
                  ]}
                >
                  {product.stock} units
                  {product.stock < 10}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Total Products: {filteredProducts.length}
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
