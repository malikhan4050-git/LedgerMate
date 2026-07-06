import { StyleSheet } from 'react-native';

import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  container: {
    marginBottom: 18,
  },

  input: {
    height: Sizes.inputHeight,
    borderRadius: Sizes.borderRadius,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 20,
    fontSize: 18,
    color: Colors.primaryText,
    textAlignVertical: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 8,
  },

  inputError: {
    borderColor: '#E53935',
    borderWidth: 2,
  },

  errorText: {
    color: '#E53935',
    fontSize: 13,
    marginTop: 5,
    marginLeft: 5,
    fontWeight: '500',
  },
});