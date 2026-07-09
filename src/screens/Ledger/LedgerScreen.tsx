import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { getEntries } from '../../services/entryApi';
import styles from './styles';

interface Entry {
  _id: string;
  name: string;
  entryType: 'sale' | 'purchase';
  itemsDescription: string;
  manualTotalPrice: number;
  transactionDate: string;
  notes?: string;
  createdAt: string;
}

const LedgerScreen = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEntries();
      console.log('API Response:', response);
      
      // Handle different response structures
      const entriesData = response?.entries || response?.data || response?.result || [];
      setEntries(entriesData);
    } catch (error: any) {
      console.error('Error fetching entries:', error);
      setError(error?.response?.data?.message || 'Failed to load entries');
      Alert.alert('Error', 'Failed to load entries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading entries...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchEntries}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render empty state
  if (entries.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No entries found</Text>
        <Text style={styles.emptySubtext}>Add your first entry from the Add tab</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Ledger Overview</Text>
            <Text style={styles.headerSubtitle}>
              {entries.length} transaction{entries.length > 1 ? 's' : ''} recorded
            </Text>
          </View>

          {/* Raw Data Display (Step 1 - Just showing data) */}
          {entries.map((entry) => (
            <View
              key={entry._id}
              style={{
                backgroundColor: '#f5f5f5',
                padding: 12,
                marginBottom: 8,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Name: {entry.name}</Text>
              <Text>Type: {entry.entryType}</Text>
              <Text>Items: {entry.itemsDescription}</Text>
              <Text>Amount: PKR {entry.manualTotalPrice}</Text>
              <Text>Date: {new Date(entry.transactionDate).toLocaleString()}</Text>
              {entry.notes && <Text>Notes: {entry.notes}</Text>}
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LedgerScreen;