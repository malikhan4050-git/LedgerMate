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
import LedgerCardModal from './components/LedgerCardModal';
import {
  EntryPayload,
  getEntries,
  EntryResponse,
} from '../../services/entryApi';
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
  products?: Array<{
    product: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }>;
  discount?: number;
  subtotal?: number;
  totalAmount?: number;
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
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 20;
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'sale' | 'purchase'
  >('all');

  useEffect(() => {
    fetchEntries(1, false);
  }, []);

  useEffect(() => {
    let filtered = entries;

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

    if (selectedFilter !== 'all') {
      filtered = filtered.filter(entry => entry.entryType === selectedFilter);
    }

    setFilteredEntries(filtered);
  }, [searchText, entries, selectedFilter]);

  const handleCardPress = (entry: Entry) => {
    setSelectedEntry(entry);
    setCardModalVisible(true);
  };

  const handleCardModalClose = () => {
    setCardModalVisible(false);
    setSelectedEntry(null);
  };

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

  const fetchEntries = async (page: number = 1, append: boolean = false) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    setError(null);

    try {
      const response = await getEntries(page, itemsPerPage);
      console.log('API Response:', response);

      let entriesData = response?.entries || [];
      const totalPages = response?.totalPages || 1;
      const totalEntries = response?.totalEntries || 0;

      entriesData = entriesData.map((entry: any) => ({
        ...entry,
        name:
          entry.name ||
          entry.customer?.name ||
          entry.supplier?.name ||
          'Unknown',
        manualTotalPrice: entry.totalAmount || entry.manualTotalPrice || 0,
      }));

      const sortedData = sortEntriesByDate(entriesData);

      if (append) {
        setEntries(prev => [...prev, ...sortedData]);
      } else {
        setEntries(sortedData);
      }

      setTotalEntries(totalEntries);
      setTotalPages(totalPages);
      setHasMore(page < totalPages);
      setCurrentPage(page);
    } catch (error: any) {
      console.error('Error fetching entries:', error);
      setError(error?.response?.data?.message || 'Failed to load entries');
      Alert.alert('Error', 'Failed to load entries. Please try again.');
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
      setRefreshing(false);
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
    await fetchEntries(1, false);
  };

  const loadMore = (): void => {
    if (!isLoadingMore && hasMore) {
      fetchEntries(currentPage + 1, true);
    }
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

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 40;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadMore();
    }
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
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => fetchEntries(1, false)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
                    <Text style={[styles.columnHeader, styles.columnName]}>
                      Name
                    </Text>
                    <Text style={[styles.columnHeader, styles.columnDetails]}>
                      Details
                    </Text>
                    <Text style={[styles.columnHeader, styles.columnAmount]}>
                      Amount
                    </Text>
                  </View>

                  {groupedEntries[dateKey].map(entry => {
                    const { time } = formatDate(entry.transactionDate);
                    const isSale = entry.entryType === 'sale';

                    return (
                      <TouchableOpacity
                        key={entry._id}
                        activeOpacity={0.7}
                        onPress={() => handleCardPress(entry)}
                      >
                        <View style={styles.cardRow}>
                          <View style={[styles.cardCell, styles.columnName]}>
                            <Text style={styles.cardName} numberOfLines={1}>
                              {entry.name}
                            </Text>
                          </View>

                          <View style={[styles.cardCell, styles.columnDetails]}>
                            <Text style={styles.cardItems} numberOfLines={1}>
                              {/* For advance users: show product names from products array */}
                              {entry.products && entry.products.length > 0
                                ? entry.products.map(p => p.name).join(', ')
                                : entry.itemsDescription}
                            </Text>
                            {entry.discount ? (
                              <Text
                                style={styles.cardDiscount}
                                numberOfLines={1}
                              >
                                Discount: PKR {entry.discount}
                              </Text>
                            ) : null}
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
                              PKR {entry.totalAmount || entry.manualTotalPrice}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ));
            })()
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Showing {entries.length} of {totalEntries} entries
          </Text>
        </View>
        {isLoadingMore && (
          <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color="#1E90FF" />
            <Text style={styles.loadingMoreText}>Loading more...</Text>
          </View>
        )}
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

      <LedgerCardModal
        visible={cardModalVisible}
        entry={selectedEntry}
        onClose={handleCardModalClose}
        onEdit={() => {
          setCardModalVisible(false);
          handleEdit(selectedEntry);
        }}
        onDelete={() => {
          setCardModalVisible(false);
          handleDeletePress(selectedEntry);
        }}
      />
    </KeyboardAvoidingView>
  );
};

export default LedgerScreen;
