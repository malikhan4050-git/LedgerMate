import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

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
  // Custom header with NO text - just gradient + status bar
  const renderCustomHeader = () => {
    return (
      <LinearGradient
        colors={['#4A90E2', '#4CCB8C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientHeader}
      >
        {/* Status bar area - translucent so gradient shows through */}
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View />
      </LinearGradient>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: true,
          header: () => renderCustomHeader(), // No title passed anymore

          // Keep height the same so screen content doesn't shift
          headerStyle: {
            height: Platform.OS === 'ios' ? 40 : 20,
            backgroundColor: 'transparent',
          },

          // Tab bar styling - PULLED UPWARD
          tabBarIcon: ({ color, size }) => {
            const iconName = iconMap[route.name] ?? 'ellipse-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1E90FF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            height: 70,
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={DashboardHomeScreen} />
      <Tab.Screen name="Ledger" component={LedgerScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Styles
const styles = StyleSheet.create({
  gradientHeader: {
    flex: 1,
    paddingTop:
      Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
    height: Platform.OS === 'ios' ? 40 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default MainAppNavigator;
