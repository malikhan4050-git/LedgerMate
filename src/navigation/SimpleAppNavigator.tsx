import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdvanceDashboardScreen from '../screens/Dashboard/AdvanceDashboardScreen';
import SimpleDashboardScreen from '../screens/Dashboard/SimpleDashboardScreen';

export type AdvanceStackParamList = {
  DashboardHome: undefined;
};

const Stack = createNativeStackNavigator<AdvanceStackParamList>();

const SimpleAppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DashboardHome"
        component={SimpleDashboardScreen}
      />
    </Stack.Navigator>
  );
};

export default SimpleAppNavigator;