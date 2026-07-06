import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryText,
    marginBottom: 12,
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
    fontWeight: '600',
    color: Colors.primaryBlue,
  },

  selectedText: {
    color: Colors.white,
  },
});

export default styles;