import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import DashboardHomeScreen from '../screens/Dashboard/DashboardHomeScreen';
import LedgerScreen from '../screens/Ledger/LedgerScreen';
import AddScreen from '../screens/Add/AddScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ProductsScreen from '../screens/Products/ProductsScreen';

export type AppTabParamList = {
  Home: undefined;
  Ledger: undefined;
  Add: undefined;
  Products: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

const iconMap: Record<string, string> = {
  Home: 'home-outline',
  Ledger: 'book-outline',
  Add: 'add-circle-outline',
  Products: 'grid-outline',
  Profile: 'person-outline',
};

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const headerTitles: Record<string, string> = {
          Home: 'Dashboard',
          Ledger: 'Ledger Overview',
          Add: 'Add Entry',
          Products: 'Products',
          Profile: 'Profile Settings',
        };

        return {
          headerShown: true,
          headerTitle: headerTitles[route.name] ?? route.name,
          headerTitleAlign: 'center',

          // Render the same gradient used by buttons as the header background
          headerBackground: () => (
            <LinearGradient
              colors={["#4A90E2", "#4CCB8C"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          ),

          headerStyle: {
            height: 60,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 18,
            color: '#FFFFFF',
          },
          
          tabBarIcon: ({ color, size }) => {
            const iconName = iconMap[route.name] ?? 'ellipse-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1E90FF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            height: 64,
            paddingBottom: 6,
            paddingTop: 6,
            borderTopWidth: 0.5,
            borderTopColor: '#d1d1d1',
          },
        };
      }}>
      <Tab.Screen name="Home" component={DashboardHomeScreen} />
      <Tab.Screen name="Ledger" component={LedgerScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainAppNavigator;