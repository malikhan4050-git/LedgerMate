import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

interface Props {
  title: string;
  subtitle: string;
}

const Header = ({title, subtitle}: Props) => {
  return (
    <View>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

export default Header;