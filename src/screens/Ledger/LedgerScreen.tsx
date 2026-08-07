import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LedgerListView from './stackScreens/LedgerListView';

const LedgerScreen = () => {
  const navigation = useNavigation();
  const { height} = Dimensions.get('window');
  const tabBarHeight = 70;
  const cardHeight = (height - 180 - tabBarHeight) / 3;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ledger</Text>
        <Text style={styles.headerSubtitle}>
          Deal with all of your records and transactions in one place
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* Card 1: Show Ledger */}
        <TouchableOpacity
          style={[styles.card, { height: cardHeight }]} // Set dynamic height
          onPress={() => navigation.navigate('LedgerListView' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="receipt-outline" size={32} color="#1E90FF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Show Ledger</Text>
            <Text style={styles.cardDescription}>
              View all your sales and purchase transactions in detail
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card 2: Manage Customers Records */}
        <TouchableOpacity
          style={[styles.card, { height: cardHeight }]} // Set dynamic height
          onPress={() => navigation.navigate('CustomerRecords' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="people-outline" size={32} color="#2E7D32" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Manage Customers Records</Text>
            <Text style={styles.cardDescription}>
              Search and manage customer-wise transaction history
            </Text>
          </View>
        </TouchableOpacity>
        {/* Card 3: Payment History */}
        <TouchableOpacity
          style={[styles.card, { height: cardHeight }]} // Set dynamic height
          onPress={() => navigation.navigate('PaymentHistory' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="time-outline" size={32} color="#546E7A" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Payment History</Text>
            <Text style={styles.cardDescription}>
              View your payment transaction history
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LedgerScreen;
