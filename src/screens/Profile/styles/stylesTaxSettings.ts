import { StyleSheet } from 'react-native';
import Colors from '../../../theme/Colors';
import Sizes from '../../../theme/Sizes';

export default StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: Sizes.screenPadding,
  },

  header: {
    marginTop: 35,
    marginBottom: 16,
    paddingHorizontal: Sizes.screenPadding,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: Sizes.borderRadius,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },

  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },

  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  settingTextContainer: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.primaryText,
  },

  settingDescription: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 1,
  },

  buttonContainer: {
    flexDirection: 'column',
    marginTop: 20,
    gap: 10,
  },

  cancelButton: {
    width: '100%',
    height: 48,
    borderRadius: Sizes.borderRadius,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondaryText,
  },

  saveButtonWrapper: {
    width: '100%',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});