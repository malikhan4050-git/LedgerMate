import {Platform, StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';
import { getStatusBarHeight } from 'react-native-status-bar-height';


const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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

  passwordContainer: {
    position: 'relative',
  },

  forgotContainer: {
    alignItems: 'flex-end',
    marginTop: -5,
    marginBottom: 25,
  },

  forgotText: {
    fontSize: 15,
    color: Colors.primaryBlue,
    fontWeight: '600',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 20,
  },

  bottomText: {
    fontSize: 16,
    color: Colors.secondaryText,
  },

  signupText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryBlue,
  },
  // ============================================
// NEW STYLES FOR THE GRADIENT HEADER & LAYOUT
// (These do NOT conflict with existing styles)
// ============================================

  gradientHeader: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : getStatusBarHeight(),
    height: Platform.OS === 'ios' ? 100 : 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default styles;