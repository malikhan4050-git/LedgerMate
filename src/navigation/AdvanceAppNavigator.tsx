import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdvanceDashboardScreen from '../screens/Dashboard/AdvanceDashboardScreen';

export type AdvanceStackParamList = {
  DashboardHome: undefined;
};

const Stack = createNativeStackNavigator<AdvanceStackParamList>();

const AdvanceAppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DashboardHome"
        component={AdvanceDashboardScreen}
      />
    </Stack.Navigator>
  );
};

export default AdvanceAppNavigator;