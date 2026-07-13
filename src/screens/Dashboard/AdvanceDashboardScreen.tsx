import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardLogo from '../../components/Logo/HeaderLogo';
import styles from './styles';

const AdvanceDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Advance Dashboard Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default AdvanceDashboardScreen;