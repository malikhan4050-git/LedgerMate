import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface GradientHeaderProps {
  children?: React.ReactNode;
}

const GradientHeader = ({ children }: GradientHeaderProps) => {
  return (
    <LinearGradient
      colors={['#4A90E2', '#4CCB8C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
        height: Platform.OS === 'ios' ? 100 : 80,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
      }}
    >
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {children}
    </LinearGradient>
  );
};

export default GradientHeader;