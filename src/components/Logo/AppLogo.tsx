import React from 'react';
import {Image} from 'react-native';

import styles from './styles';

const AppLogo = () => {
  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={styles.imageAppLogo}
    />
  );
};

export default AppLogo;