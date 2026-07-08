import React from 'react';

import {
  Pressable,
  Text,
  View,
  type StyleProp,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface Props {
  title: string;
  onPress: () => void;
  titleStyle?: StyleProp<any>;
  disabled?: boolean;
}

const GradientButton = ({
  title,
  onPress,
  titleStyle,
  disabled = false,
}: Props) => {
  return (
    <Pressable 
      onPress={onPress} 
      android_ripple={{ color: 'transparent' }}
      disabled={disabled}
    >
      {({ pressed }: { pressed: boolean }) => (
        <LinearGradient
          colors={disabled ? ['#B0B0B0', '#D0D0D0'] : ['#4A90E2', '#4CCB8C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradientButton, disabled && styles.disabledButton]}
        >
          <Text style={[styles.buttonText, titleStyle, disabled && styles.disabledText]}>
            {title}
          </Text>
          {pressed && !disabled ? (
            <View pointerEvents="none" style={styles.pressedOverlay} />
          ) : null}
        </LinearGradient>
      )}
    </Pressable>
  );
};

export default GradientButton;