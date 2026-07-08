import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryText,
    marginBottom: 12,
  },

  compactToggleContainer: {
    borderRadius: 8,
  },

  compactOption: {
    paddingVertical: 10,
  },

  compactOptionText: {
    fontSize: 14,
  },

  toggleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    borderRadius: 10,
    overflow: 'hidden',
  },

  option: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  selectedOption: {
    backgroundColor: Colors.primaryBlue,
  },

  optionText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.primaryBlue,
  },

  selectedText: {
    color: Colors.white,
  },
  
});

export default styles;