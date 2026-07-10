import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: 'all' | 'sale' | 'purchase';
  onSelectFilter: (filter: 'all' | 'sale' | 'purchase') => void;
}

const FilterModal = ({
  visible,
  onClose,
  selectedFilter,
  onSelectFilter,
}: FilterModalProps) => {
  const filters = [
    { id: 'all', label: 'All Transactions', icon: 'list-outline' },
    { id: 'sale', label: 'Sales', icon: 'trending-up-outline' },
    { id: 'purchase', label: 'Purchases', icon: 'trending-down-outline' },
  ];

  const handleSelect = (filter: 'all' | 'sale' | 'purchase') => {
    onSelectFilter(filter);
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Transactions</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close-outline" size={24} color="#333" />
                </TouchableOpacity>
              </View>

              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterOption,
                    selectedFilter === filter.id && styles.filterOptionActive,
                  ]}
                  onPress={() => handleSelect(filter.id as 'all' | 'sale' | 'purchase')}
                >
                  <View style={styles.filterOptionLeft}>
                    <Icon 
                      name={filter.icon} 
                      size={20} 
                      color={selectedFilter === filter.id ? '#1E90FF' : '#555'} 
                    />
                    <Text 
                      style={[
                        styles.filterOptionText,
                        selectedFilter === filter.id && styles.filterOptionTextActive,
                      ]}
                    >
                      {filter.label}
                    </Text>
                  </View>
                  {selectedFilter === filter.id && (
                    <Icon name="checkmark-circle" size={20} color="#1E90FF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;