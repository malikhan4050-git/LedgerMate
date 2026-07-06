import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      <Text style={styles.subtitle}>View your statements and performance reports here.</Text>
    </View>
  );
};

export default ReportScreen;

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
