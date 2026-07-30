import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import BusinessDetailsScreen from '../screens/BusinessDetails/BusinessDetailsScreen';
import EditPersonalInfoScreen from '../screens/Profile/stackScreens/EditPersonalInfoScreen';
import EditBusinessInfoScreen from '../screens/Profile/stackScreens/EditBusinessInfoScreen';
import ChangePasswordScreen from '../screens/Profile/stackScreens/ChangePasswordScreen';
import NotificationSettingsScreen from '../screens/Profile/stackScreens/NotificationSettingsScreen';
import AppearanceScreen from '../screens/Profile/stackScreens/AppearanceScreen';
import LanguageScreen from '../screens/Profile/stackScreens/LanguageScreen';
import TaxSettingsScreen from '../screens/Profile/stackScreens/TaxSettingsScreen';
import HelpSupportScreen from '../screens/Profile/stackScreens/HelpSupportScreen';
import TermsPrivacyScreen from '../screens/Profile/stackScreens/TermsPrivacyScreen';
import MainAppNavigator from './MainAppNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  BusinessDetails: undefined;
  App: undefined;
  EditPersonalInfoScreen: undefined;
  EditBusinessInfoScreen: undefined;
  ChangePasswordScreen: undefined;
  NotificationSettingsScreen : undefined;
  AppearanceScreen : undefined;
  LanguageScreen : undefined;
  TaxSettingsScreen : undefined;
  HelpSupportScreen : undefined;
  TermsPrivacyScreen : undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen
          name="BusinessDetails"
          component={BusinessDetailsScreen}
        />
        <Stack.Screen
          name="EditPersonalInfoScreen"
          component={EditPersonalInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditBusinessInfoScreen"
          component={EditBusinessInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationSettingsScreen"
          component={NotificationSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppearanceScreen"
          component={AppearanceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TaxSettingsScreen"
          component={TaxSettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HelpSupportScreen"
          component={HelpSupportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsPrivacyScreen"
          component={TermsPrivacyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="App" component={MainAppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
