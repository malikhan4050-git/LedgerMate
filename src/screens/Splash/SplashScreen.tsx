import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppDispatch } from '../../redux/hooks';
import { setSession } from '../../redux/slices/sessionSlice';
import { RootStackParamList } from '../../navigation/RootNavigator';
import Colors from '../../constants/Colors';
import { Images } from '../../constants/Images';
import api from '../../api/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), 1000);
    });

    try {
      // Get token from storage
      const token = await AsyncStorage.getItem('token');

      // If no token, go to Login
      if (!token) {
        navigation.replace('Login');
        return;
      }

      // Verify token and get latest user/business
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responsePayload = response?.data?.result ?? response?.data ?? {};
      const user = responsePayload.user ?? null;
      const business = responsePayload.business ?? null;

      await AsyncStorage.setItem('user', JSON.stringify(user ?? null));
      await AsyncStorage.setItem('business', JSON.stringify(business ?? null));

      dispatch(
        setSession({
          token,
          user,
          business,
        }),
      );

      const hasBusinessDetails = business && business.success !== false;

      if (!hasBusinessDetails) {
        navigation.replace('BusinessDetails');
      } else {
        navigation.replace('App');
      }
    } catch (error) {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('business');

      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 600,
    height: 600,
  },
});
