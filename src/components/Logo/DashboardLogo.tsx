import React from 'react';
import {Image} from 'react-native';

import styles from './styles';

const DashboardLogo = () => {
  return (
    <Image
      source={require('../../assets/images/DashboardLogo.png')}
      style={styles.imageDashboardLogo}
    />
  );
};


export default DashboardLogo;