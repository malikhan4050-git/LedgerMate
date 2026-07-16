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

import FilterModal from './components/FilterModal';
import { EntryPayload, getEntries } from '../../services/entryApi';
import { updateEntry, deleteEntry } from '../../services/entryApi';
import EditEntryModal from './components/EditEntryModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
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
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'sale' | 'purchase'
  >('all');

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    let filtered = entries;

    if (searchText.trim() !== '') {
      filtered = filtered.filter(
        entry =>
          entry.name.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.itemsDescription.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.notes?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(entry => entry.entryType === selectedFilter);
    }

    setFilteredEntries(filtered);
  }, [searchText, entries, selectedFilter]);

  const groupEntriesByDate = (entries: Entry[]) => {
    const grouped: { [key: string]: Entry[] } = {};

    entries.forEach(entry => {
      const date = new Date(entry.transactionDate || entry.createdAt);
      const dateKey = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(entry);
    });

    return grouped;
  };

  const sortEntriesByDate = (entriesData: any[]) => {
    return [...entriesData].sort((a, b) => {
      const dateA = new Date(a.transactionDate || a.createdAt);
      const dateB = new Date(b.transactionDate || b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getEntries();

      let entriesData =
        response?.entries || response?.data || response?.result || [];

      entriesData = entriesData.map((entry: any) => ({
        ...entry,
        name:
          entry.name ||
          entry.customer?.name ||
          entry.supplier?.name ||
          'Unknown',
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

  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    setEditModalVisible(true);
  };

  const handleUpdateEntry = async (updatedData: Partial<EntryPayload>) => {
    if (!selectedEntry) return;

    try {
      const updated = await updateEntry(selectedEntry._id, updatedData);
      setEntries(prev =>
        prev.map(e => (e._id === selectedEntry._id ? { ...e, ...updated } : e)),
      );
      setFilteredEntries(prev =>
        prev.map(e => (e._id === selectedEntry._id ? { ...e, ...updated } : e)),
      );
    } catch (error) {
      throw error;
    }
  };

  const handleDeletePress = (entry: any) => {
    setSelectedEntry(entry);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteEntry(id);
      setEntries(prev => prev.filter(entry => entry._id !== id));
      setFilteredEntries(prev => prev.filter(entry => entry._id !== id));
      setDeleteModalVisible(false);
      setSelectedEntry(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete entry. Please try again.');
    } finally {
      setIsDeleting(false);
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
      date: date.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading entries...</Text>
      </View>
    );
  }

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
          />
        }
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Ledger Overview</Text>
            <Text style={styles.headerSubtitle}>
              {filteredEntries.length} transaction
              {filteredEntries.length > 1 ? 's' : ''} recorded
            </Text>
          </View>

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
            <TouchableOpacity
              style={styles.filterIconContainer}
              onPress={() => setFilterModalVisible(true)}
            >
              <Icon
                name="options-outline"
                size={22}
                color={selectedFilter !== 'all' ? '#1E90FF' : '#8E8E93'}
              />
            </TouchableOpacity>
          </View>

          {filteredEntries.length === 0 && searchText !== '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>
                Try searching with different keywords
              </Text>
            </View>
          ) : filteredEntries.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No entries found</Text>
              <Text style={styles.emptySubtext}>
                Add your first entry from the Add tab
              </Text>
            </View>
          ) : (
            (() => {
              const groupedEntries = groupEntriesByDate(filteredEntries);
              const sortedDates = Object.keys(groupedEntries).sort((a, b) => {
                const dateA = new Date(a);
                const dateB = new Date(b);
                return dateB.getTime() - dateA.getTime();
              });

              return sortedDates.map(dateKey => (
                <View key={dateKey} style={styles.dateGroup}>
                  <View style={styles.dateHeader}>
                    <Text style={styles.dateHeaderText}>{dateKey}</Text>
                  </View>

                  <View style={styles.columnHeaders}>
                    <Text style={[styles.columnHeader, styles.columnType]}>
                      Type
                    </Text>
                    <Text style={[styles.columnHeader, styles.columnDetails]}>
                      Details
                    </Text>
                    <Text style={[styles.columnHeader, styles.columnAmount]}>
                      Amount
                    </Text>
                    <Text style={[styles.columnHeader, styles.columnTime]}>
                      Time
                    </Text>
                    <Text style={[styles.columnHeader, styles.columnBy]}>
                      By
                    </Text>
                  </View>

                  {groupedEntries[dateKey].map(entry => {
                    const { time } = formatDate(entry.transactionDate);
                    const isSale = entry.entryType === 'sale';

                    return (
                      <View key={entry._id} style={styles.cardRow}>
                        <View style={[styles.cardCell, styles.columnType]}>
                          <View
                            style={[
                              styles.cardBadge,
                              isSale
                                ? styles.cardBadgeSale
                                : styles.cardBadgePurchase,
                            ]}
                          >
                            <Text
                              style={[
                                styles.cardBadgeText,
                                isSale
                                  ? styles.cardBadgeTextSale
                                  : styles.cardBadgeTextPurchase,
                              ]}
                            >
                              {isSale ? 'S' : 'P'}
                            </Text>
                          </View>
                        </View>

                        <View style={[styles.cardCell, styles.columnDetails]}>
                          <Text style={styles.cardItems} numberOfLines={1}>
                            {entry.itemsDescription}
                          </Text>
                          {entry.notes && (
                            <Text style={styles.cardNotes} numberOfLines={1}>
                              {entry.notes}
                            </Text>
                          )}
                        </View>

                        <View style={[styles.cardCell, styles.columnAmount]}>
                          <Text
                            style={[
                              styles.cardAmount,
                              isSale
                                ? styles.cardAmountSale
                                : styles.cardAmountPurchase,
                            ]}
                          >
                            RS {entry.manualTotalPrice}
                          </Text>
                        </View>

                        <View style={[styles.cardCell, styles.columnTime]}>
                          <Text style={styles.cardTime}>{time}</Text>
                        </View>

                        <View style={[styles.cardCell, styles.columnBy]}>
                          <Text style={styles.cardName} numberOfLines={1}>
                            {entry.name}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              ));
            })()
          )}
        </View>
      </ScrollView>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <EditEntryModal
        visible={editModalVisible}
        entry={selectedEntry}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedEntry(null);
        }}
        onSave={handleUpdateEntry}
      />

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        entryId={selectedEntry?._id || ''}
        entryName={selectedEntry?.itemsDescription || selectedEntry?.name}
        onClose={() => {
          setDeleteModalVisible(false);
          setSelectedEntry(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </KeyboardAvoidingView>
  );
};

export default LedgerScreen;