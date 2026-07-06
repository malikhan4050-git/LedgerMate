import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

type Props = {
  title: string;
  selectedValue: string;
  leftTitle: string;
  rightTitle: string;
  onValueChange: (value: string) => void;
};

const ToggleSelector = ({
  title,
  selectedValue,
  leftTitle,
  rightTitle,
  onValueChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedValue === 'simple' &&
              styles.selectedOption,
          ]}
          onPress={() => onValueChange('simple')}>
          <Text
            style={[
              styles.optionText,
              selectedValue === 'simple' &&
                styles.selectedText,
            ]}>
            {leftTitle}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selectedValue === 'advanced' &&
              styles.selectedOption,
          ]}
          onPress={() => onValueChange('advanced')}>
          <Text
            style={[
              styles.optionText,
              selectedValue === 'advanced' &&
                styles.selectedText,
            ]}>
            {rightTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToggleSelector;