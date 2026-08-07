import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAlert } from '../../../hooks/useAlert';
import {
  getEntries,
  updateEntry,
  deleteEntry,
} from '../../../services/entryApi';
import { createPayment } from '../../../services/paymentApi';
import styles from './stylesCustomerDetail';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  notes?: string;
}

const CustomerDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { showAlert } = useAlert();
  const { customer } = route.params as any;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchCustomerTransactions = async () => {
    try {
      const response = await getEntries(1, 1000);
      const entries =
        response?.entries || response?.data || response?.result || [];

      // Filter entries for this customer
      const customerEntries = entries.filter((entry: any) => {
        const customerId =
          entry.customer?._id || entry.customer?.id || entry.customer;
        return customerId === customer.id;
      });

      // Map to transaction format
      const txList: Transaction[] = customerEntries.map((entry: any) => ({
        id: entry._id,
        date: entry.transactionDate || entry.createdAt,
        description:
          entry.products?.map((p: any) => p.name).join(', ') ||
          entry.itemsDescription ||
          'Transaction',
        amount: entry.totalAmount || entry.manualTotalPrice || 0,
        notes: entry.notes || '',
      }));

      // Sort by date (newest first for display)
      txList.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setTransactions(txList);
    } catch (error) {
      console.error('Error fetching customer transactions:', error);
      showAlert('Error', 'Failed to load transactions', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerTransactions();
  }, []);

  const totalOutstanding = transactions.reduce((sum, t) => sum + t.amount, 0);

const handleReceivePayment = async () => {
  const amount = parseFloat(paymentAmount);
  if (!amount || amount <= 0) {
    showAlert('Error', 'Please enter a valid amount', 'error');
    return;
  }
  if (amount > totalOutstanding) {
    showAlert('Error', 'Amount exceeds total outstanding', 'error');
    return;
  }

  setProcessing(true);

  try {
    let remaining = amount;
    let updatedTransactions = [...transactions];
    let paymentNote = '';

    // ✅ STEP 1: Exact match check
    const exactMatchIndex = updatedTransactions.findIndex(
      tx => tx.amount === amount,
    );

    if (exactMatchIndex !== -1) {
      const exactOrder = updatedTransactions[exactMatchIndex];
      await deleteEntry(exactOrder.id);
      updatedTransactions.splice(exactMatchIndex, 1);
      paymentNote = `User paid ${amount} from this order (full payment)`;
      remaining = 0;
    } else {
      // ✅ STEP 2: FIFO (oldest first)
      updatedTransactions.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      let i = 0;
      while (remaining > 0 && i < updatedTransactions.length) {
        const current = updatedTransactions[i];

        if (remaining >= current.amount) {
          remaining -= current.amount;
          await deleteEntry(current.id);
          updatedTransactions.splice(i, 1);
        } else {
          const paidAmount = remaining;
          const newAmount = current.amount - paidAmount;

          const existingNote = current.notes || '';
          let newNote = '';

          const paidMatch = existingNote.match(/User paid (\d+)/);
          if (paidMatch) {
            const alreadyPaid = parseInt(paidMatch[1], 10);
            const totalPaid = alreadyPaid + paidAmount;
            newNote = `User paid ${totalPaid} from this order`;
          } else {
            newNote = `User paid ${paidAmount} from this order`;
          }

          await updateEntry(current.id, {
            manualTotalPrice: newAmount,
            notes: newNote,
          });

          updatedTransactions[i].amount = newAmount;
          updatedTransactions[i].notes = newNote;
          paymentNote = newNote;
          remaining = 0;
        }
      }
    }

    // ✅ STEP 3: Create payment history record
    await createPayment({
      customer: customer.id,
      amount: amount,
      note: paymentNote || `User paid ${amount} from this order`,
      paymentDate: new Date().toISOString(),
    });

    // ✅ STEP 4: Sort back to newest first for display
    updatedTransactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    setTransactions(updatedTransactions);
    setPaymentAmount('');

    showAlert(
      'Success',
      `Payment of PKR ${amount.toLocaleString()} received and recorded successfully!`,
      'success',
    );
  } catch (error) {
    console.error('Payment processing error:', error);
    showAlert(
      'Error',
      'Failed to process payment. Please try again.',
      'error',
    );
  } finally {
    setProcessing(false);
  }
};

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchCustomerTransactions();
    setRefreshing(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
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
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Customer Transactions</Text>
            <Text style={styles.subtitle}>
              The transactions for {customer.name}
            </Text>
          </View>

          {/* Transactions List */}
          <View style={styles.container}>
            {transactions.length === 0 ? (
              <View style={styles.noTransactions}>
                <Text style={styles.noTransactionsText}>
                  No outstanding transactions
                </Text>
              </View>
            ) : (
              transactions.map(tx => (
                <View key={tx.id} style={styles.transactionItem}>
                  <Text style={styles.transactionDate}>
                    {new Date(tx.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={styles.transactionDesc}>{tx.description}</Text>
                  <Text style={styles.transactionAmount}>
                    PKR {tx.amount.toLocaleString()}
                  </Text>

                  {/* ✅ Show payment note if exists */}
                  {tx.notes && tx.notes.includes('User paid') && (
                    <Text style={styles.paymentNote}>{tx.notes}</Text>
                  )}
                </View>
              ))
            )}

            {/* Receive Payment Section */}
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentLabel}>Receive Payment</Text>
              <View style={styles.paymentInputRow}>
                <TextInput
                  style={styles.paymentInput}
                  placeholder="Enter amount"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={paymentAmount}
                  onChangeText={setPaymentAmount}
                />
                {processing ? (
                  <ActivityIndicator size="small" color="#1E90FF" />
                ) : (
                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={handleReceivePayment}
                    disabled={processing}
                  >
                    <Text style={styles.payButtonText}>Pay</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomerDetailScreen;
