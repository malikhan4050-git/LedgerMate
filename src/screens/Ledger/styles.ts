import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';
import cardHeight from './LedgerScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Sizes.screenPadding,
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

  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20, // ✅ softer, less round
    padding: 20, // ✅ reduced from 45
    paddingHorizontal: 24, // ✅ wider horizontally
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row', // ✅ horizontal layout
    justifyContent: 'flex-start',
    gap: 16,
    height: cardHeight, // ✅ dynamic height based on screen size
  },
  cardIconContainer: {
    padding: 12,
    backgroundColor: Colors.cardBackground,
    borderRadius: 50,
    marginBottom: 0, // ✅ remove bottom margin
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 13,
    color: Colors.secondaryText,
    textAlign: 'left', // ✅ left-aligned for horizontal layout
    lineHeight: 18,
  },
});

export default styles;
