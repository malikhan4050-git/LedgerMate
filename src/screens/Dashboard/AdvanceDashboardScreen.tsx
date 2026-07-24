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
import styles from './stylesAdvanceDashboard';

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

const AdvanceDashboardScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.session?.user);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Calculate totals
  const totalSales = entries
    .filter(e => e.entryType === 'sale')
    .reduce((sum, e) => sum + (e.totalAmount || e.manualTotalPrice || 0), 0);

  const totalPurchases = entries
    .filter(e => e.entryType === 'purchase')
    .reduce((sum, e) => sum + (e.totalAmount || e.manualTotalPrice || 0), 0);

  const recentEntries = entries.slice(0, 5);

  // =============================================
  // FEATURE 1: Transaction Trends
  // =============================================
  const getTodayEntries = () => {
    const today = new Date().toDateString();
    return entries.filter(
      e => new Date(e.transactionDate).toDateString() === today,
    ).length;
  };

  const getWeekEntries = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - 7));
    return entries.filter(e => new Date(e.transactionDate) >= weekStart).length;
  };

  const getMonthEntries = () => {
    const now = new Date();
    const monthStart = new Date(now.setDate(now.getDate() - 30));
    return entries.filter(e => new Date(e.transactionDate) >= monthStart)
      .length;
  };

  const todayEntries = getTodayEntries();
  const weekEntries = getWeekEntries();
  const monthEntries = getMonthEntries();

  // =============================================
  // FEATURE 2: Top Products
  // =============================================
  const getTopProducts = () => {
    const productCount: {
      [key: string]: { name: string; count: number; total: number };
    } = {};

    entries.forEach(entry => {
      if (entry.products && entry.products.length > 0) {
        entry.products.forEach(p => {
          if (productCount[p.name]) {
            productCount[p.name].count += p.quantity;
            productCount[p.name].total += p.total;
          } else {
            productCount[p.name] = {
              name: p.name,
              count: p.quantity,
              total: p.total,
            };
          }
        });
      }
    });

    return Object.values(productCount)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const topProducts = getTopProducts();

  // =============================================
  // FEATURE 3: Quick Stats
  // =============================================
  const avgTransaction =
    entries.length > 0
      ? Math.round((totalSales + totalPurchases) / entries.length)
      : 0;

  const highestSale = entries
    .filter(e => e.entryType === 'sale')
    .reduce(
      (max, e) => Math.max(max, e.totalAmount || e.manualTotalPrice || 0),
      0,
    );

  // =============================================
  // FEATURE 4: Weekly Summary
  // =============================================
  const getWeeklyData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = days.map(day => ({ label: day, sales: 0, purchases: 0 }));

    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - 7));

    entries.forEach(entry => {
      const entryDate = new Date(entry.transactionDate);
      if (entryDate >= weekStart) {
        const dayIndex = entryDate.getDay();
        const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        const amount = entry.totalAmount || entry.manualTotalPrice || 0;
        if (entry.entryType === 'sale') {
          weekData[mappedIndex].sales += amount;
        } else {
          weekData[mappedIndex].purchases += amount;
        }
      }
    });

    return weekData;
  };

  const weekData = getWeeklyData();
  const maxWeeklyAmount = Math.max(
    ...weekData.map(d => Math.max(d.sales, d.purchases)),
    1,
  );

  // =============================================
  // FEATURE 5: Top Customers
  // =============================================
  const getTopCustomers = () => {
    const customerMap: {
      [key: string]: { name: string; total: number; count: number };
    } = {};

    entries.forEach(entry => {
      const customerName = entry.name || 'Unknown';
      const amount = entry.totalAmount || entry.manualTotalPrice || 0;
      if (customerMap[customerName]) {
        customerMap[customerName].total += amount;
        customerMap[customerName].count += 1;
      } else {
        customerMap[customerName] = {
          name: customerName,
          total: amount,
          count: 1,
        };
      }
    });

    return Object.values(customerMap)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  };

  const topCustomers = getTopCustomers();

  const fetchEntries = async () => {
    try {
      const response = await getEntries(1, 100);
      let entriesData =
        response?.entries || response?.data || response?.result || [];

      entriesData = entriesData.map((entry: any) => ({
        ...entry,
        name:
          entry.name ||
          entry.customer?.name ||
          entry.supplier?.name ||
          'Unknown',
        manualTotalPrice: entry.totalAmount || entry.manualTotalPrice || 0,
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.greeting}>
          {getGreeting()}, {userName}!
        </Text>
        <Text style={styles.subtitle}>Here's your business at a glance</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, styles.salesCard]}>
          <View style={styles.summaryIconContainer}>
            <Icon name="trending-up-outline" size={22} color="#2E7D32" />
          </View>
          <Text style={styles.summaryLabel}>Total Sales</Text>
          <Text style={styles.summaryAmount}>
            PKR {totalSales.toLocaleString()}
          </Text>
        </View>

        <View style={[styles.summaryCard, styles.purchaseCard]}>
          <View style={styles.summaryIconContainer}>
            <Icon name="trending-down-outline" size={22} color="#C62828" />
          </View>
          <Text style={styles.summaryLabel}>Total Purchases</Text>
          <Text style={styles.summaryAmount}>
            PKR {totalPurchases.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Net Balance */}
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

      {/* FEATURE 3: Quick Stats */}
      <View style={styles.quickStatsRow}>
        <View style={styles.quickStatCard}>
          <Icon name="cash-outline" size={20} color="#1E90FF" />
          <Text style={styles.quickStatValue}>
            PKR {avgTransaction.toLocaleString()}
          </Text>
          <Text style={styles.quickStatLabel}>Avg. Transaction</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Icon name="arrow-up-outline" size={20} color="#2E7D32" />
          <Text style={styles.quickStatValue}>
            PKR {highestSale.toLocaleString()}
          </Text>
          <Text style={styles.quickStatLabel}>Highest Sale</Text>
        </View>
        <View style={styles.quickStatCard}>
          <Icon name="calendar-outline" size={20} color="#1E90FF" />
          <Text style={styles.quickStatValue}>{todayEntries}</Text>
          <Text style={styles.quickStatLabel}>Today's Entries</Text>
        </View>
      </View>

      {/* FEATURE 1: Transaction Trends */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Transaction Trends</Text>
        <View style={styles.trendRow}>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>Today</Text>
            <Text style={styles.trendValue}>{todayEntries}</Text>
          </View>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>This Week</Text>
            <Text style={styles.trendValue}>{weekEntries}</Text>
          </View>
          <View style={styles.trendItem}>
            <Text style={styles.trendLabel}>This Month</Text>
            <Text style={styles.trendValue}>{monthEntries}</Text>
          </View>
        </View>
      </View>

      {/* FEATURE 4: Weekly Summary */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Weekly Summary</Text>
        <View style={styles.weekRow}>
          {weekData.map((day, index) => (
            <View key={index} style={styles.weekDayItem}>
              <View style={styles.weekBarContainer}>
                <View
                  style={[
                    styles.weekBar,
                    {
                      height: Math.max((day.sales / maxWeeklyAmount) * 40, 4),
                      backgroundColor: '#2E7D32',
                    },
                  ]}
                />
                <View
                  style={[
                    styles.weekBar,
                    {
                      height: Math.max(
                        (day.purchases / maxWeeklyAmount) * 40,
                        4,
                      ),
                      backgroundColor: '#C62828',
                    },
                  ]}
                />
              </View>
              <Text style={styles.weekDayLabel}>{day.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Transactions */}
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
              Add your first entry from the Add section
            </Text>
          </View>
        ) : (
          recentEntries.map(entry => {
            const isSale = entry.entryType === 'sale';
            const amount = entry.totalAmount || entry.manualTotalPrice || 0;

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
                      {entry.products && entry.products.length > 0
                        ? entry.products.map(p => p.name).join(', ')
                        : entry.itemsDescription}
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
                  {isSale ? '+' : '-'} PKR {amount}
                </Text>
              </View>
            );
          })
        )}
      </View>

      {/* FEATURE 5: Top Customers */}
      {topCustomers.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Customers</Text>
          {topCustomers.map((customer, index) => (
            <View key={index} style={styles.topCustomerItem}>
              <View style={styles.topCustomerLeft}>
                <Text style={styles.topCustomerRank}>#{index + 1}</Text>
                <Text style={styles.topCustomerName}>{customer.name}</Text>
              </View>
              <View style={styles.topCustomerRight}>
                <Text style={styles.topCustomerCount}>
                  {customer.count} transactions
                </Text>
                <Text style={styles.topCustomerAmount}>
                  PKR {customer.total.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* FEATURE 2: Top Products */}
      {topProducts.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          {topProducts.map((product, index) => (
            <View key={index} style={styles.topProductItem}>
              <Text style={styles.topProductRank}>#{index + 1}</Text>
              <Text style={styles.topProductName}>{product.name}</Text>
              <Text style={styles.topProductCount}>x{product.count}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{entries.length}</Text>
          <Text style={styles.statLabel}>Total Transactions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {entries.length > 0
              ? Math.round((totalSales / (totalSales + totalPurchases)) * 100)
              : 0}
            %
          </Text>
          <Text style={styles.statLabel}>Sales Ratio</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {entries.length > 0
              ? Math.round(
                  (totalPurchases / (totalSales + totalPurchases)) * 100,
                )
              : 0}
            %
          </Text>
          <Text style={styles.statLabel}>Purchase Ratio</Text>
        </View>
      </View>

      {/* Profit/Loss Summary */}
      <View style={styles.profitLossContainer}>
        <View style={styles.profitLossItem}>
          <Text style={styles.profitLossLabel}>Total Sales</Text>
          <Text style={[styles.profitLossValue, styles.profitLossSale]}>
            PKR {totalSales.toLocaleString()}
          </Text>
        </View>
        <View style={styles.profitLossDivider} />
        <View style={styles.profitLossItem}>
          <Text style={styles.profitLossLabel}>Total Purchases</Text>
          <Text style={[styles.profitLossValue, styles.profitLossPurchase]}>
            PKR {totalPurchases.toLocaleString()}
          </Text>
        </View>
        <View style={styles.profitLossDivider} />
        <View style={[styles.profitLossItem, styles.profitLossTotal]}>
          <Text style={styles.profitLossLabel}>Net Profit</Text>
          <Text
            style={[
              styles.profitLossValue,
              styles.profitLossTotalValue,
              totalSales - totalPurchases >= 0
                ? styles.positive
                : styles.negative,
            ]}
          >
            PKR {(totalSales - totalPurchases).toLocaleString()}
          </Text>
        </View>
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

export default AdvanceDashboardScreen;
