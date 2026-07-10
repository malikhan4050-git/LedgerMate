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
  // Fetch entries on component mount
  useEffect(() => {
    fetchEntries();
  }, []);
  useEffect(() => {
    let filtered = entries;

    // Apply search filter
    if (searchText.trim() !== '') {
      filtered = filtered.filter(
        entry =>
          entry.name.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.itemsDescription
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          entry.notes?.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(entry => entry.entryType === selectedFilter);
    }

    setFilteredEntries(filtered);
  }, [searchText, entries, selectedFilter]);

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
      console.log('API Response:', response);

      let entriesData =
        response?.entries || response?.data || response?.result || [];

      // Map the data to ensure name is properly extracted
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

  // --- Edit Handler (opens modal) ---
  const handleEdit = (entry: any) => {
    setSelectedEntry(entry);
    setEditModalVisible(true);
  };

  // --- Edit Save Handler (called from modal) ---
  const handleUpdateEntry = async (updatedData: Partial<EntryPayload>) => {
    if (!selectedEntry) return;

    try {
      const updated = await updateEntry(selectedEntry._id, updatedData);
      // Update local state
      setEntries(prev =>
        prev.map(e => (e._id === selectedEntry._id ? { ...e, ...updated } : e)),
      );
      setFilteredEntries(prev =>
        prev.map(e => (e._id === selectedEntry._id ? { ...e, ...updated } : e)),
      );
      // Close modal is handled by the modal's onSave
    } catch (error) {
      throw error; // Let the modal catch it
    }
  };

  // --- Delete Handler (opens modal) ---
  const handleDeletePress = (entry: any) => {
    setSelectedEntry(entry);
    setDeleteModalVisible(true);
  };

  // --- Delete Confirm Handler (called from modal) ---
  const handleDeleteConfirm = async (id: string) => {
    setIsDeleting(true);
    try {
      await deleteEntry(id);
      // Remove from state
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

          {/* Empty state for search results */}
          {filteredEntries.length === 0 && searchText !== '' ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No results found</Text>
              <Text style={styles.emptySubtext}>
                Try searching with different keywords
              </Text>
            </View>
          ) : (
            /* Cards */
            filteredEntries.map(entry => {
              const { date, time } = formatDate(entry.transactionDate);
              const isSale = entry.entryType === 'sale';

              return (
                <View key={entry._id} style={styles.card}>
                  {/* Card Header - Type Badge and Actions */}
                  <View style={styles.cardHeader}>
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
                        {isSale ? 'Sale' : 'Purchase'}
                      </Text>
                    </View>
                    <View style={styles.cardActions}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEdit(entry)}
                      >
                        <Icon name="pencil-outline" size={18} color="#1E90FF" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDeletePress(entry)}
                      >
                        <Icon name="trash-outline" size={18} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Card Body - Amount and Items */}
                  <View style={styles.cardBody}>
                    <Text
                      style={[
                        styles.cardAmount,
                        isSale
                          ? styles.cardAmountSale
                          : styles.cardAmountPurchase,
                      ]}
                    >
                      PKR {entry.manualTotalPrice}
                    </Text>
                    <Text style={styles.cardItems}>
                      {entry.itemsDescription}
                    </Text>
                    {entry.notes && (
                      <View style={styles.cardNotesContainer}>
                        <Icon
                          name="chatbubble-outline"
                          size={14}
                          color="#8E8E93"
                        />
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
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />
      {/* Edit Modal */}
      <EditEntryModal
        visible={editModalVisible}
        entry={selectedEntry}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedEntry(null);
        }}
        onSave={handleUpdateEntry}
      />

      {/* Delete Confirmation Modal */}
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
