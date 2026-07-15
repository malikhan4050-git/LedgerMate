import { StyleSheet } from 'react-native';

import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  gradientButton: {
    height: Sizes.buttonHeight,

    borderRadius: Sizes.borderRadius,

    justifyContent: 'center',

    alignItems: 'center',

    marginTop: 10,

    shadowColor: '#000',

    shadowOpacity: 0.2,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 7,
  },

  buttonText: {
    color: Colors.white,

    fontSize: 22,

    fontWeight: '700',
  },

  pressedOverlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: Sizes.borderRadius,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  disabledButton: {
    opacity: 0.7,
  },
  disabledText: {
    color: '#FFFFFF',
  },
});
