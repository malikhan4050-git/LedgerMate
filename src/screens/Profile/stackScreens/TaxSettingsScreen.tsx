// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   RefreshControl,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector, useDispatch } from 'react-redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

// import { useAlert } from '../../../hooks/useAlert';
// import GradientButton from '../../../components/Buttons/GradientButton';
// import { updateBusiness } from '../../../redux/slices/sessionSlice';
// import styles from '../styles/stylesTaxSettings';
// import type { RootState } from '../../../redux/store';

// const TaxSettingsScreen = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const { showAlert } = useAlert();

//   const business = useSelector((state: RootState) => state.session.business);

//   const [taxRate, setTaxRate] = useState(business?.taxRate?.toString() || '');
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [errors, setErrors] = useState({
//     taxRate: '',
//   });

//   const onRefresh = async () => {
//     setRefreshing(true);
//     setRefreshing(false);
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       taxRate: '',
//     };

//     if (!taxRate || taxRate.trim() === '') {
//       newErrors.taxRate = 'Please enter tax rate';
//       isValid = false;
//     } else if (isNaN(Number(taxRate)) || Number(taxRate) < 0) {
//       newErrors.taxRate = 'Please enter a valid tax rate';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSave = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     try {
//       const updatedBusiness = {
//         ...business,
//         taxRate: parseFloat(taxRate),
//       };

//       await AsyncStorage.setItem('business', JSON.stringify(updatedBusiness));
//       dispatch(updateBusiness(updatedBusiness));

//       showAlert('Success', 'Tax settings updated successfully!', 'success');

//       setTimeout(() => {
//         navigation.goBack();
//       }, 1500);
//     } catch (error: any) {
//       showAlert('Error', 'Failed to update tax settings. Please try again.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     navigation.goBack();
//   };

//   return (
//     <>
//       <StatusBar
//         translucent={true}
//         backgroundColor="transparent"
//         barStyle="light-content"
//       />

//       <LinearGradient
//         colors={['#4A90E2', '#4CCB8C']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={{
//           height: Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
//           paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'center',
//           paddingHorizontal: 16,
//         }}
//       />

//       <KeyboardAvoidingView
//         style={styles.keyboardContainer}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#1E90FF']}
//             />
//           }
//         >
//           <View style={styles.header}>
//             <Text style={styles.headerTitle}>Tax & Settings</Text>
//             <Text style={styles.subtitle}>
//               Manage tax and app preferences
//             </Text>
//           </View>

//           <View style={styles.container}>
//             <View style={styles.fieldContainer}>
//               <Text style={styles.label}>Tax Rate (%)</Text>
//               <TextInput
//                 style={[styles.input, errors.taxRate && styles.inputError]}
//                 placeholder="Enter tax rate"
//                 placeholderTextColor="#8E8E93"
//                 keyboardType="numeric"
//                 value={taxRate}
//                 onChangeText={(text) => {
//                   setTaxRate(text);
//                   if (errors.taxRate) setErrors((prev) => ({ ...prev, taxRate: '' }));
//                 }}
//                 editable={!loading}
//               />
//               {errors.taxRate ? (
//                 <Text style={styles.errorText}>{errors.taxRate}</Text>
//               ) : null}
//             </View>

//             <View style={styles.buttonContainer}>
//               <View style={styles.saveButtonWrapper}>
//                 {loading ? (
//                   <ActivityIndicator size="small" color="#ffffff" />
//                 ) : (
//                   <GradientButton
//                     title="Save Settings"
//                     titleStyle={styles.saveButtonText}
//                     onPress={handleSave}
//                   />
//                 )}
//               </View>

//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={handleCancel}
//                 disabled={loading}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </>
//   );
// };

// export default TaxSettingsScreen;