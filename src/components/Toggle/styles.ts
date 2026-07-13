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
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },

  optionContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: 6,
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

  subtitleText: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
    textAlign: 'center',
  },

  selectedSubtitleText: {
    color: 'rgba(255, 255, 255, 0.8)', // White with slight transparency
  },
});

export default styles;