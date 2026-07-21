import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import GradientButton from '../Buttons/GradientButton';
import styles from './styles';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

const CustomAlert = ({
  visible,
  title,
  message,
  type,
  onClose,
}: CustomAlertProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'close-circle';
      case 'warning': return 'warning';
      case 'info': return 'information-circle';
      default: return 'information-circle';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success': return '#2E7D32';
      case 'error': return '#C62828';
      case 'warning': return '#F57C00';
      case 'info': return '#1E90FF';
      default: return '#1E90FF';
    }
  };

  const getIconBgColor = () => {
    switch (type) {
      case 'success': return '#E8F5E9';
      case 'error': return '#FFEBEE';
      case 'warning': return '#FFF3E0';
      case 'info': return '#E3F2FD';
      default: return '#E3F2FD';
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon Circle */}
          <View style={[styles.iconCircle, { backgroundColor: getIconBgColor() }]}>
            <Icon name={getIcon()} size={40} color={getColor()} />
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: getColor() }]}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <View style={styles.buttonWrapper}>
            <GradientButton
              title="OK"
              titleStyle={styles.buttonText}
              onPress={onClose}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;