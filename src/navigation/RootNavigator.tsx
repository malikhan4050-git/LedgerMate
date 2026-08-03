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
import SettingsScreen from '../screens/Profile/stackScreens/SettingsScreen';
import HelpSupportScreen from '../screens/Profile/stackScreens/HelpSupportScreen';
import TermsPrivacyScreen from '../screens/Profile/stackScreens/TermsPrivacyScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
// import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
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
  SettingsScreen : undefined;
  HelpSupportScreen : undefined;
  TermsPrivacyScreen : undefined;
  ForgotPassword: undefined;
  ResetPassword : { token: string } | undefined;
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
          name="SettingsScreen"
          component={SettingsScreen}
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
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown : false}}/>
        {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{headerShown : false}}/> */}
        <Stack.Screen name="App" component={MainAppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
