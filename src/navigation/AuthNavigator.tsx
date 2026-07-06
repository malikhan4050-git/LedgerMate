import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
// import AppNavigator from './AppNavigator';
import SimpleAppNavigator from './SimpleAppNavigator'
import AdvanceAppNavigator from './AdvanceAppNavigator'
import BusinessDetailsScreen from '../screens/BusinessDetails/BusinessDetailsScreen';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  BusinessDetails : undefined;
  SimpleDashboard: undefined;
  AdvanceDashboard : undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
        <Stack.Screen name="SimpleDashboard" component={SimpleAppNavigator} />
        <Stack.Screen name="AdvanceDashboard" component={AdvanceAppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;