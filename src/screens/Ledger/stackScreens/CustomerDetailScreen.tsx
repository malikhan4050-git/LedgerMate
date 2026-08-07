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
import GradientButton from '../../../components/Buttons/GradientButton';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Transaction {
  applicantId: string;
  amount: number;
  notes?: string;
  date: string;
}

const CustomerDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { showAlert } = useAlert();
  const { customer } = route.params as any;

  const isSupplier = customer?.isSupplier || false;
  const partyName = customer?.name || 'Unknown';

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isManuallySet, setIsManuallySet] = useState(false);
  const [notes, setNotes] = useState('');

  // ✅ Add refresh trigger to force re-fetch
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchCustomerTransactions = async () => {
    try {
      const response = await getEntries(1, 1000);
      const entries =
        response?.entries || response?.data || response?.result || [];

      const filteredEntries = entries.filter((entry: any) => {
        if (isSupplier) {
          const supplierId =
            entry.supplier?._id || entry.supplier?.id || entry.supplier;
          return supplierId === customer.id;
        } else {
          const customerId =
            entry.customer?._id || entry.customer?.id || entry.customer;
          return customerId === customer.id;
        }
      });

      const txList: Transaction[] = filteredEntries.map((entry: any) => ({
        applicantId: entry._id,
        amount: entry.totalAmount || entry.manualTotalPrice || 0,
        notes: entry.notes || '',
        date: entry.transactionDate || entry.createdAt,
      }));

      txList.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setTransactions(txList);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      showAlert('Error', 'Failed to load transactions', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ✅ Trigger fetch on mount and whenever refreshTrigger changes
  useEffect(() => {
    fetchCustomerTransactions();
  }, [refreshTrigger]);

  const totalOutstanding = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Auto-update date/time every minute
  useEffect(() => {
    if (!isManuallySet) {
      const interval = setInterval(() => {
        setSelectedDate(new Date());
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [isManuallySet]);

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedDate.getHours());
      newDate.setMinutes(selectedDate.getMinutes());
      setSelectedDate(newDate);
      setIsManuallySet(true);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setSelectedDate(newDate);
      setIsManuallySet(true);
    }
  };

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

      const exactMatchIndex = updatedTransactions.findIndex(
        tx => tx.amount === amount,
      );

      if (exactMatchIndex !== -1) {
        const exactOrder = updatedTransactions[exactMatchIndex];
        await deleteEntry(exactOrder.applicantId);
        updatedTransactions.splice(exactMatchIndex, 1);
        paymentNote = `User paid ${amount} from this order (full payment)`;
        remaining = 0;
      } else {
        updatedTransactions.sort(
          (a, b) => new Date(a.date).getTime() - new Date(a.date).getTime(),
        );

        let i = 0;
        while (remaining > 0 && i < updatedTransactions.length) {
          const current = updatedTransactions[i];

          if (remaining >= current.amount) {
            remaining -= current.amount;
            await deleteEntry(current.applicantId);
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

            await updateEntry(current.applicantId, {
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

      await createPayment({
        customer: customer.id,
        amount: amount,
        note: paymentNote || `User paid ${amount} from this order`,
        paymentDate: selectedDate.toISOString(),
      });

      // ✅ Update local state immediately
      setTransactions(updatedTransactions);
      setPaymentAmount('');
      setNotes('');

      // ✅ Wait 1 second then trigger re-fetch to sync with backend
      setTimeout(() => {
        setRefreshTrigger(prev => prev + 1);
      }, 1000);

      showAlert(
        'Success',
        `Payment of PKR ${amount.toLocaleString()} received and recorded successfully!`,
        'success',
      );
    } catch (error: any) {
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {isSupplier ? 'Supplier Transactions' : 'Customer Transactions'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isSupplier
                ? `View all transactions for ${partyName}`
                : `View all transactions for ${partyName}`}
            </Text>
          </View>

          <View style={styles.container}>
            {/* Avatar / Icon Section */}
            <TouchableOpacity style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  isSupplier ? styles.avatarSupplier : styles.avatarCustomer,
                ]}
              >
                <Icon
                  name={isSupplier ? 'cart-outline' : 'receipt-outline'}
                  size={50}
                  color="#FFFFFF"
                />
              </View>
              <Text style={styles.avatarChangeText}>Total Outstanding</Text>
              <Text
                style={[
                  styles.avatarChangeText,
                  { fontSize: 18, fontWeight: 'bold', marginTop: 4 },
                  isSupplier ? styles.totalRed : styles.totalGreen,
                ]}
              >
                PKR {totalOutstanding.toLocaleString()}
              </Text>
            </TouchableOpacity>

            {/* Transactions List */}
            {transactions.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="receipt-outline" size={60} color="#D1D1D6" />
                <Text style={styles.emptyText}>
                  No outstanding transactions
                </Text>
                <Text style={styles.emptySubtext}>
                  {isSupplier
                    ? 'This supplier has no pending orders'
                    : 'This customer has no pending orders'}
                </Text>
              </View>
            ) : (
              transactions.map(tx => (
                <View key={tx.applicantId} style={styles.transactionItem}>
                  <View style={styles.transactionHeader}>
                    <Text style={styles.transactionDate}>
                      {new Date(tx.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Text>
                    <Text
                      style={[
                        styles.transactionAmount,
                        isSupplier ? styles.transactionAmountRed : null,
                      ]}
                    >
                      PKR {tx.amount.toLocaleString()}
                    </Text>
                  </View>
                  {tx.notes && tx.notes.includes('User paid') && (
                    <Text style={styles.paymentNote}>{tx.notes}</Text>
                  )}
                </View>
              ))
            )}

            {/* Date & Time Section */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date & Time</Text>
              <View style={styles.dateTimeRow}>
                <TouchableOpacity
                  style={[
                    styles.input,
                    styles.dateTimeInput,
                    styles.dateInput,
                    { flex: 1, marginRight: 8 },
                  ]}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.dateTimeText}>
                    {selectedDate.toLocaleDateString('en-US', {
                      month: 'numeric',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.input,
                    styles.dateTimeInput,
                    styles.timeInput,
                    { flex: 1, marginLeft: 8 },
                  ]}
                  onPress={() => setShowTimePicker(true)}
                >
                  <Text style={styles.dateTimeText}>
                    {selectedDate.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </Text>
                </TouchableOpacity>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>

            {/* Receive Payment / Pay Supplier Section */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                {isSupplier ? 'Pay Supplier' : 'Receive Payment'}
              </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  placeholderTextColor="#8E8E93"
                  keyboardType="numeric"
                  value={paymentAmount}
                  onChangeText={setPaymentAmount}
                />
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <View style={styles.saveButtonWrapper}>
                {processing ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <GradientButton
                    title={isSupplier ? 'Pay Supplier' : 'Receive Payment'}
                    titleStyle={styles.saveButtonText}
                    onPress={handleReceivePayment}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleBack}
                disabled={processing}
              >
                <Text style={styles.cancelButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomerDetailScreen;