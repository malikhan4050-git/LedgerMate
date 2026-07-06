import {StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: Colors.WHITE,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.BLACK,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: Colors.BLACK,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },

  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
  },
});