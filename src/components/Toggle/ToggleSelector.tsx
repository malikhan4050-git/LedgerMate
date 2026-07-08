import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import styles from './styles';

type Props = {
  title: string;
  selectedValue: string;
  leftTitle: string;
  rightTitle: string;
  compact?: boolean;
  onValueChange: (value: string) => void;
};

const ToggleSelector = ({
  title,
  selectedValue,
  leftTitle,
  rightTitle,
  compact = false,
  onValueChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={[styles.toggleContainer, compact && styles.compactToggleContainer]}>
        <Pressable
          style={[
            styles.option,
            compact && styles.compactOption,
            selectedValue === 'simple' && styles.selectedOption,
          ]}
          onPress={() => onValueChange('simple')}
        >
          <Text
            style={[
              styles.optionText,
              compact && styles.compactOptionText,
              selectedValue === 'simple' && styles.selectedText,
            ]}
          >
            {leftTitle}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.option,
            compact && styles.compactOption,
            selectedValue === 'advanced' && styles.selectedOption,
          ]}
          onPress={() => onValueChange('advanced')}
        >
          <Text
            style={[
              styles.optionText,
              compact && styles.compactOptionText,
              selectedValue === 'advanced' && styles.selectedText,
            ]}
          >
            {rightTitle}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ToggleSelector;