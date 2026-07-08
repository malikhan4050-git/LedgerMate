import React from 'react';

import {
  Pressable,
  Text,
  View,
  TextStyle,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface Props {
  title: string;
  onPress: () => void;
  titleStyle?: TextStyle;
}

const GradientButton = ({
  title,
  onPress,
  titleStyle,
}: Props) => {
  return (
    <Pressable onPress={onPress} android_ripple={{ color: 'transparent' }}>
      {({ pressed }: { pressed: boolean }) => (
        <LinearGradient
          colors={['#4A90E2', '#4CCB8C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
          {pressed ? (
            <View pointerEvents="none" style={styles.pressedOverlay} />
          ) : null}
        </LinearGradient>
      )}
    </Pressable>
  );
};

export default GradientButton;