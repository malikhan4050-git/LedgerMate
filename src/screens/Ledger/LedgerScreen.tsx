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
  RefreshControl,
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
  const [refreshing, setRefreshing] = useState(false); 

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

  const sortEntriesByDate = (entriesData : any[]) => {
    return [...entriesData].sort((a, b) => {
      const dateA = new Date(a.transactionDate || a.createdAt);
      const dateB = new Date(b.transactionDate || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    })
  };

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEntries();
      console.log('API Response:', response);
      
      let entriesData = response?.entries || response?.data || response?.result || [];
      
      // Map the data to ensure name is properly extracted
      entriesData = entriesData.map((entry: any) => ({
        ...entry,
        name: entry.name || entry.customer?.name || entry.supplier?.name || 'Unknown',
      }));
      
      entriesData = sortEntriesByDate(entriesData);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };
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
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#1E90FF']}
          // tintColor={['1E90FF']} helpful for iOS.
          />
        }
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
              placeholder="Search transactions..."
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
            /* Cards */
            filteredEntries.map((entry) => {
              const { date, time } = formatDate(entry.transactionDate);
              const isSale = entry.entryType === 'sale';
              
              return (
                <View key={entry._id} style={styles.card}>
                  {/* Card Header - Type Badge */}
                  <View style={styles.cardHeader}>
                    <View style={[
                      styles.cardBadge,
                      isSale ? styles.cardBadgeSale : styles.cardBadgePurchase
                    ]}>
                      <Text style={[
                        styles.cardBadgeText,
                        isSale ? styles.cardBadgeTextSale : styles.cardBadgeTextPurchase
                      ]}>
                        {isSale ? 'Sale' : 'Purchase'}
                      </Text>
                    </View>
                  </View>

                  {/* Card Body - Amount and Items */}
                  <View style={styles.cardBody}>
                    <Text style={[
                      styles.cardAmount,
                      isSale ? styles.cardAmountSale : styles.cardAmountPurchase
                    ]}>
                      PKR {entry.manualTotalPrice}
                    </Text>
                    <Text style={styles.cardItems}>
                      {entry.itemsDescription}
                    </Text>
                    {entry.notes && (
                      <View style={styles.cardNotesContainer}>
                        <Icon name="chatbubble-outline" size={14} color="#8E8E93" />
                        <Text style={styles.cardNotes} numberOfLines={1}>
                          {entry.notes}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Card Footer - Date/Time and Name */}
                  <View style={styles.cardFooter}>
                    <View style={styles.cardFooterLeft}>
                      <Text style={styles.cardDate}>{date}</Text>
                      <Text style={styles.cardTime}>{time}</Text>
                    </View>
                    <View style={styles.cardFooterRight}>
                      <Icon name="person-outline" size={14} color="#8E8E93" />
                      <Text style={styles.cardName} numberOfLines={1}>
                        {entry.name}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LedgerScreen;