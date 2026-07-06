import React from 'react';

import {
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';

import styles from './styles';

interface Props {
  title: string;
  icon: any;
  onPress: () => void;
}

const SocialButton = ({
  title,
  icon,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.socialButton}
      onPress={onPress}>
      <Image
        source={icon}
        style={styles.icon}
      />

      <Text style={styles.socialText}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialButton;