import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Sizes.screenPadding,
    paddingVertical: 25,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },

  formContainer: {
    marginTop: 30,
  },

  passwordContainer: {
    position: 'relative',
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 25,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: Colors.primaryBlue,
    borderRadius: 5,
    marginTop: 2,
    marginRight: 12,
  },

  checkboxSelected: {
    backgroundColor: Colors.primaryBlue,
  },

  checkboxText: {
    flex: 1,
    fontSize: 15,
    color: Colors.secondaryText,
    lineHeight: 22,
  },

  link: {
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

  loginText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primaryBlue,
  },
  agreeError: {
    color: '#E53935',
    marginTop: -8,
    marginBottom: 15,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default styles;
