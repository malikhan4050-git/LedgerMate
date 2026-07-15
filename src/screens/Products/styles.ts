import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: Sizes.screenPadding,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  header: {
    marginTop: 10,
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },

  headerSubtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 2,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 4,
  },

  // Locked State Styles
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  lockedIcon: {
    fontSize: 64,
    marginBottom: 16,
  },

  lockedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 8,
  },

  lockedDescription: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },

  // Placeholder for Premium Users
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  placeholderText: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
});