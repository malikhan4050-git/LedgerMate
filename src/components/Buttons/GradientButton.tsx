import React from 'react';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

const GradientButton = ({
  title,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}>
      <LinearGradient
        colors={['#4A90E2', '#4CCB8C']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientButton}>
        <Text style={styles.buttonText}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;