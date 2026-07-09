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
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  const [filteredEntries, setFilteredEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  // Fetch entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);

  // Filter entries when search text changes
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter((entry) =>
        entry.name.toLowerCase().includes(searchText.toLowerCase()) ||
        entry.itemsDescription.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredEntries(filtered);
    }
  }, [searchText, entries]);

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEntries();
      console.log('API Response:', response);
      
      // Handle different response structures
      const entriesData = response?.entries || response?.data || response?.result || [];
      setEntries(entriesData);
      setFilteredEntries(entriesData);
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

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Ledger Overview</Text>
            <Text style={styles.headerSubtitle}>
              {filteredEntries.length} transaction{filteredEntries.length > 1 ? 's' : ''} recorded
            </Text>
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
              placeholder="Search by customer or items..."
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

          {/* Empty state for search results */}
          {filteredEntries.length === 0 && searchText !== '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>Try searching with different keywords</Text>
            </View>
          ) : (
            /* Raw Data Display */
            filteredEntries.map((entry) => (
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
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LedgerScreen;