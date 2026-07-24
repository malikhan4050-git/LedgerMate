import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

interface UserCardProps {
  name: string;
  email: string;
  phone: string;
  plan: string;
}

const UserCard = ({ name, email, phone, plan }: UserCardProps) => {
  const isAdvance = plan === 'Advance Plan';

  return (
    <View style={styles.userCard}>
      <View style={styles.userAvatar}>
        <Icon name="person" size={40} color="#FFFFFF" />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <View style={styles.userDetailRow}>
          <Icon name="mail-outline" size={14} color="#8E8E93" />
          <Text style={styles.userDetail}>{email}</Text>
        </View>
        <View style={styles.userDetailRow}>
          <Icon name="call-outline" size={14} color="#8E8E93" />
          <Text style={styles.userDetail}>{phone}</Text>
        </View>
      </View>
      <View style={[styles.planBadge, isAdvance ? styles.advanceBadge : styles.simpleBadge]}>
        <Text style={[styles.planText, isAdvance ? styles.advanceText : styles.simpleText]}>
          {plan}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;