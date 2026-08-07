import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAlert } from '../../../hooks/useAlert';
import { getEntries } from '../../../services/entryApi';
import styles from './stylesCustomerRecords';

interface CustomerSummary {
  id: string;
  name: string;
  salesTotal: number;
  purchasesTotal: number;
  netBalance: number;
  transactionCount: number;
  isSupplier?: boolean;
}

const CustomerRecordsScreen = () => {
  const navigation = useNavigation();
  const { showAlert } = useAlert();

  const [customers, setCustomers] = useState<CustomerSummary[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerSummary[]>(
    [],
  );
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCustomerSummaries = async () => {
    try {
      const response = await getEntries(1, 100);
      const entries =
        response?.entries || response?.data || response?.result || [];

      const partyMap = new Map<
        string,
        {
          name: string;
          salesTotal: number;
          purchasesTotal: number;
          count: number;
        }
      >();

      entries.forEach((entry: any) => {
        const amount = entry.totalAmount || entry.manualTotalPrice || 0;
        const isSale = entry.entryType === 'sale';

        const partyId = isSale
          ? entry.customer?._id || entry.customer?.id || entry.customer
          : entry.supplier?._id || entry.supplier?.id || entry.supplier;

        const partyName = isSale
          ? entry.customer?.name || entry.name || 'Unknown'
          : entry.supplier?.name || entry.name || 'Unknown';

        if (partyId) {
          const existing = partyMap.get(partyId);
          if (existing) {
            if (isSale) {
              existing.salesTotal += amount;
            } else {
              existing.purchasesTotal += amount;
            }
            existing.count += 1;
          } else {
            partyMap.set(partyId, {
              name: partyName,
              salesTotal: isSale ? amount : 0,
              purchasesTotal: isSale ? 0 : amount,
              count: 1,
            });
          }
        }
      });

      const summary: CustomerSummary[] = Array.from(partyMap.entries()).map(
        ([id, data]) => ({
          id,
          name: data.name,
          salesTotal: data.salesTotal,
          purchasesTotal: data.purchasesTotal,
          netBalance: data.salesTotal - data.purchasesTotal,
          transactionCount: data.count,
          isSupplier: data.purchasesTotal > data.salesTotal,
        }),
      );

      summary.sort((a, b) => b.netBalance - a.netBalance);

      setCustomers(summary);
      setFilteredCustomers(summary);
    } catch (error) {
      console.error('Error fetching customer summaries:', error);
      showAlert('Error', 'Failed to load customer records', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomerSummaries();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredCustomers(filtered);
    }
  }, [searchText, customers]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCustomerSummaries();
    setRefreshing(false);
  };

  const handleCustomerPress = (customer: CustomerSummary) => {
    // @ts-ignore
    navigation.navigate('CustomerDetail', {
      customer: {
        ...customer,
        isSupplier: customer.isSupplier || false,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading customer records...</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <LinearGradient
        colors={['#4A90E2', '#4CCB8C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height:
            Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
          paddingTop:
            Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 64}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#1E90FF']}
            />
          }
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Customer Records</Text>
              <Text style={styles.headerSubtitle}>
                View total outstanding for each customer
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
                placeholder="Search customers..."
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

            {filteredCustomers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="people-outline" size={48} color="#D1D1D6" />
                <Text style={styles.emptyText}>
                  {searchText !== ''
                    ? 'No customers found'
                    : 'No customers yet'}
                </Text>
                <Text style={styles.emptySubtext}>
                  {searchText !== ''
                    ? 'Try searching with different keywords'
                    : 'Add customers from the Add tab'}
                </Text>
              </View>
            ) : (
              filteredCustomers.map(customer => (
                <TouchableOpacity
                  key={customer.id}
                  style={styles.customerCard}
                  onPress={() => handleCustomerPress(customer)}
                  activeOpacity={0.7}
                >
                  <View style={styles.customerRow}>
                    <View>
                      <Text style={styles.customerName}>{customer.name}</Text>
                      <Text style={styles.customerMeta}>
                        {customer.transactionCount} transaction
                        {customer.transactionCount > 1 ? 's' : ''}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[styles.amountText, styles.saleAmount]}>
                        + PKR {customer.salesTotal.toLocaleString()}
                      </Text>
                      <Text style={[styles.amountText, styles.purchaseAmount]}>
                        - PKR {customer.purchasesTotal.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomerRecordsScreen;
