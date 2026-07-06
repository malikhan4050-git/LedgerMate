import {StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  greetingContainer: {
    marginTop: 5,
    paddingHorizontal: 22,
  },

  greeting: {
    fontSize: 22,

    fontWeight: '700',

    color: Colors.BLACK,
  },

  subtitle: {

    fontSize: 15,

    color: Colors.BLACK,
  },
});