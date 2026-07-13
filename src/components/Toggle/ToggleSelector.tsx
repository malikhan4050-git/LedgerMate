import React from 'react';
import {
  View,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Colors from '../../theme/Colors';

type Props = {
  title: string;
  selectedValue: string;
  leftTitle: string;
  rightTitle: string;
  leftSubtitle?: string;   
  rightSubtitle?: string;  
  leftIcon?: string;       
  rightIcon?: string;      
  compact?: boolean;
  onValueChange: (value: string) => void;
};

const ToggleSelector = ({
  title,
  selectedValue,
  leftTitle,
  rightTitle,
  leftSubtitle,
  rightSubtitle,
  leftIcon,
  rightIcon,
  compact = false,
  onValueChange,
}: Props) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Toggle Container */}
      <View style={[styles.toggleContainer, compact && styles.compactToggleContainer]}>
        
        <Pressable
          style={[
            styles.option,
            compact && styles.compactOption,
            selectedValue === 'simple' && styles.selectedOption,
          ]}
          onPress={() => onValueChange('simple')}
        >
          <View style={styles.optionContent}>
            {/* Icon + Text */}
            <View style={styles.optionRow}>
              {leftIcon && (
                <Icon
                  name={leftIcon}
                  size={compact ? 16 : 20}
                  color={selectedValue === 'simple' ? Colors.white : Colors.primaryBlue}
                  style={styles.icon}
                />
              )}
              <Text
                style={[
                  styles.optionText,
                  compact && styles.compactOptionText,
                  selectedValue === 'simple' && styles.selectedText,
                ]}
              >
                {leftTitle}
              </Text>
            </View>

            {leftSubtitle && (
              <Text
                style={[
                  styles.subtitleText,
                  selectedValue === 'simple' && styles.selectedSubtitleText,
                ]}
              >
                {leftSubtitle}
              </Text>
            )}
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.option,
            compact && styles.compactOption,
            selectedValue === 'advanced' && styles.selectedOption,
          ]}
          onPress={() => onValueChange('advanced')}
        >
          <View style={styles.optionContent}>
            {/* Icon + Text */}
            <View style={styles.optionRow}>
              {rightIcon && (
                <Icon
                  name={rightIcon}
                  size={compact ? 16 : 20}
                  color={selectedValue === 'advanced' ? Colors.white : Colors.primaryBlue}
                  style={styles.icon}
                />
              )}
              <Text
                style={[
                  styles.optionText,
                  compact && styles.compactOptionText,
                  selectedValue === 'advanced' && styles.selectedText,
                ]}
              >
                {rightTitle}
              </Text>
            </View>

            {rightSubtitle && (
              <Text
                style={[
                  styles.subtitleText,
                  selectedValue === 'advanced' && styles.selectedSubtitleText,
                ]}
              >
                {rightSubtitle}
              </Text>
            )}
          </View>
        </Pressable>

      </View>
    </View>
  );
};

export default ToggleSelector;