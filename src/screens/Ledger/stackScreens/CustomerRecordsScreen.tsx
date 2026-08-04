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
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useAlert } from '../../../hooks/useAlert';
import { getEntries } from '../../../services/entryApi';
import { searchCustomers, CustomerResult } from '../../../services/customerApi';
import styles from './stylesCustomerRecords';
import LinearGradient from 'react-native-linear-gradient';

interface CustomerSummary {
  id: string;
  name: string;
  totalOutstanding: number;
  transactionCount: number;
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
      // Fetch all entries (transactions)
      const response = await getEntries(1, 1000);
      const entries =
        response?.entries || response?.data || response?.result || [];

      // Group entries by customer
      const customerMap = new Map<
        string,
        { name: string; total: number; count: number }
      >();

      entries.forEach((entry: any) => {
        const customerId =
          entry.customer?._id || entry.customer?.id || entry.customer;
        const customerName = entry.customer?.name || entry.name || 'Unknown';

        if (customerId) {
          const amount = entry.totalAmount || entry.manualTotalPrice || 0;
          const existing = customerMap.get(customerId);
          if (existing) {
            existing.total += amount;
            existing.count += 1;
          } else {
            customerMap.set(customerId, {
              name: customerName,
              total: amount,
              count: 1,
            });
          }
        }
      });

      // Convert to array
      const summary: CustomerSummary[] = Array.from(customerMap.entries()).map(
        ([id, data]) => ({
          id,
          name: data.name,
          totalOutstanding: data.total,
          transactionCount: data.count,
        }),
      );

      // Sort by total outstanding (highest first)
      summary.sort((a, b) => b.totalOutstanding - a.totalOutstanding);

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
  };

  const handleCustomerPress = (customer: CustomerSummary) => {
    // @ts-ignore
    navigation.navigate('CustomerDetail', { customer });
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
        keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0}
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
                <Text style={styles.emptyText}>No customers found</Text>
                <Text style={styles.emptySubtext}>
                  Add customers from the Add tab
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
                    <Text style={styles.customerTotal}>
                      PKR {customer.totalOutstanding.toLocaleString()}
                    </Text>
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
