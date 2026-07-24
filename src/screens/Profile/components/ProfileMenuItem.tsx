import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle: string;
  rightText?: string;
  isLogout?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const ProfileMenuItem = ({
  icon,
  title,
  subtitle,
  rightText,
  isLogout = false,
  disabled = false,
  onPress,
}: ProfileMenuItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isLogout && styles.logoutItem, disabled && styles.disabledItem]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.menuItemLeft}>
        <View style={[styles.menuIconContainer, isLogout && styles.logoutIconContainer]}>
          <Icon
            name={icon}
            size={22}
            color={isLogout ? '#FF3B30' : '#1E90FF'}
          />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={[styles.menuTitle, isLogout && styles.logoutTitle]}>
            {title}
          </Text>
          <Text style={[styles.menuSubtitle, isLogout && styles.logoutSubtitle]}>
            {subtitle}
          </Text>
        </View>
      </View>
      <View style={styles.menuItemRight}>
        {rightText && (
          <Text style={[styles.menuRightText, isLogout && styles.logoutRightText]}>
            {rightText}
          </Text>
        )}
        <Icon
          name={isLogout ? 'chevron-forward' : 'chevron-forward-outline'}
          size={20}
          color={isLogout ? '#FF3B30' : '#C7C7CC'}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;