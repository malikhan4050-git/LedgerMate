import {StyleSheet} from 'react-native';

import Colors from '../../theme/Colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',

    alignItems: 'center',

    marginVertical: 25,
  },

  line: {
    flex: 1,

    height: 1,

    backgroundColor: Colors.divider,
  },

  text: {
    marginHorizontal: 18,

    fontSize: 18,

    color: '#707070',
  },
});