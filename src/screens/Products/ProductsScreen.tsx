import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.subtitle}>View your products and modify them here.</Text>
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
