
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LedgerListView from './stackScreens/LedgerListView';


const LedgerScreen = () => {
  const navigation = useNavigation();

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
          style={styles.card}
          onPress={() => navigation.navigate('LedgerListView' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="receipt-outline" size={40} color="#1E90FF" />
          </View>
          <Text style={styles.cardTitle}>Show Ledger</Text>
          <Text style={styles.cardDescription}>
            View all your sales and purchase transactions in detail
          </Text>
        </TouchableOpacity>

        {/* Card 2: Manage Customers Records */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CustomerRecords' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="people-outline" size={40} color="#2E7D32" />
          </View>
          <Text style={styles.cardTitle}>Manage Customers Records</Text>
          <Text style={styles.cardDescription}>
            Search and manage customer-wise transaction history
          </Text>
        </TouchableOpacity>
        {/* Card 3: Payment History */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('PaymentHistory' as never)}
          activeOpacity={0.7}
        >
          <View style={styles.cardIconContainer}>
            <Icon name="time-outline" size={40} color="#546E7A" />
          </View>
          <Text style={styles.cardTitle}>Payment History</Text>
          <Text style={styles.cardDescription}>
            View your payment transaction history
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LedgerScreen;