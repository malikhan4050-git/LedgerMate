import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/Splash/SplashScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignupScreen from '../screens/Signup/SignupScreen';
import BusinessDetailsScreen from '../screens/BusinessDetails/BusinessDetailsScreen';
import EditPersonalInfoScreen from '../screens/Profile/stackScreens/EditPersonalInfoScreen';
import MainAppNavigator from './MainAppNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  BusinessDetails: undefined;
  App: undefined;
  EditPersonalInfoScreen : undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
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
        <Stack.Screen name="EditPersonalInfoScreen" component={EditPersonalInfoScreen} options={{headerShown : false}}/>
        <Stack.Screen name="App" component={MainAppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
