import {StyleSheet} from 'react-native';

import Colors from '../../theme/Colors';

export default StyleSheet.create({
  title: {
    paddingTop: 20,
    fontSize: 40,
    fontWeight: '700',
    color: Colors.primaryText,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 5,

    fontSize: 16,

    color: Colors.secondaryText,

    textAlign: 'center',
  },
});