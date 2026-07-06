import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  
  keyboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: Sizes.screenPadding,
    paddingVertical: 30,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },

  formContainer: {
    marginTop: 35,
  },
});

export default styles;
