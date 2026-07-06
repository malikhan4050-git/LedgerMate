import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LedgerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ledger</Text>
      <Text style={styles.subtitle}>This is where ledger entries will appear.</Text>
    </View>
  );
};

export default LedgerScreen;

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
