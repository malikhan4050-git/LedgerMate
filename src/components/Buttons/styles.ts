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

  socialButton: {
    height: 58,

    borderRadius: Sizes.borderRadius,

    backgroundColor: Colors.white,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    marginBottom: 16,

    borderWidth: 1,

    borderColor: '#ECECEC',

    shadowColor: '#000',

    shadowOpacity: 0.12,

    shadowRadius: 7,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  icon: {
    width: 28,

    height: 28,

    resizeMode: 'contain',

    marginRight: 14,
  },

  socialText: {
    fontSize: 18,

    fontWeight: '600',

    color: '#000',
  },
  disabledButton: {
    opacity: 0.7,
  },
  disabledText: {
    color: '#FFFFFF',
  },
});
