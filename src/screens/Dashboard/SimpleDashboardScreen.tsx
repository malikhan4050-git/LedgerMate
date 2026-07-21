import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import GradientButton from '../../components/Buttons/GradientButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

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

const SimpleDashboardScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.session?.user);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const totalSales = entries
    .filter(e => e.entryType === 'sale')
    .reduce((sum, e) => sum + e.manualTotalPrice, 0);

  const totalPurchases = entries
    .filter(e => e.entryType === 'purchase')
    .reduce((sum, e) => sum + e.manualTotalPrice, 0);

  const recentEntries = entries.slice(0, 5);

  const fetchEntries = async () => {
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

      entriesData = [...entriesData].sort((a, b) => {
        const dateA = new Date(a.transactionDate || a.createdAt);
        const dateB = new Date(b.transactionDate || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setEntries(entriesData);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const userName = user?.name || user?.fullName || 'User';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#1E90FF']}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.greeting}>
          {getGreeting()}, {userName}!
        </Text>
        <Text style={styles.subtitle}>Here's your business at a glance</Text>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, styles.salesCard]}>
          <View style={styles.summaryIconContainer}>
            <Icon name="trending-up-outline" size={22} color="#2E7D32" />
          </View>
          <Text style={styles.summaryLabel}>Total to get</Text>
          <Text style={styles.summaryAmount}>
            PKR {totalSales.toLocaleString()}
          </Text>
        </View>

        <View style={[styles.summaryCard, styles.purchaseCard]}>
          <View style={styles.summaryIconContainer}>
            <Icon name="trending-down-outline" size={22} color="#C62828" />
          </View>
          <Text style={styles.summaryLabel}>Total to give</Text>
          <Text style={styles.summaryAmount}>
            PKR {totalPurchases.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceLeft}>
          <Icon name="wallet-outline" size={24} color="#1E90FF" />
          <Text style={styles.balanceLabel}>Net Balance</Text>
        </View>
        <Text
          style={[
            styles.balanceAmount,
            totalSales - totalPurchases >= 0
              ? styles.positive
              : styles.negative,
          ]}
        >
          PKR {(totalSales - totalPurchases).toLocaleString()}
        </Text>
      </View>

      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Ledger' as never)}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="receipt-outline" size={40} color="#D1D1D6" />
            <Text style={styles.emptyStateText}>No transactions yet</Text>
            <Text style={styles.subtitle}>
              Add your first entry from the Add tab
            </Text>
          </View>
        ) : (
          recentEntries.map(entry => {
            const isSale = entry.entryType === 'sale';
            return (
              <View key={entry._id} style={styles.recentItem}>
                <View style={styles.recentItemLeft}>
                  <View
                    style={[
                      styles.recentBadge,
                      isSale
                        ? styles.recentBadgeSale
                        : styles.recentBadgePurchase,
                    ]}
                  >
                    <Text
                      style={[
                        styles.recentBadgeText,
                        isSale
                          ? styles.recentBadgeTextSale
                          : styles.recentBadgeTextPurchase,
                      ]}
                    >
                      {isSale ? 'S' : 'P'}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.recentItemName} numberOfLines={1}>
                      {entry.itemsDescription}
                    </Text>
                    <Text style={styles.recentItemDate}>
                      {formatDate(entry.transactionDate)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.recentItemAmount,
                    isSale
                      ? styles.recentItemAmountSale
                      : styles.recentItemAmountPurchase,
                  ]}
                >
                  {isSale ? '+' : '-'} PKR {entry.manualTotalPrice}
                </Text>
              </View>
            );
          })
        )}
      </View>

      {/* Add Entry Button */}
      <GradientButton
        title="+ Add a New Entry"
        titleStyle={styles.addButtonText}
        onPress={() => navigation.navigate('Add' as never)}
      />

      {/* Extra bottom spacing for tab bar */}
      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

export default SimpleDashboardScreen;
