import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add</Text>
      <Text style={styles.subtitle}>Use this tab to add a new transaction or ledger item.</Text>
    </View>
  );
};

export default AddScreen;

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
