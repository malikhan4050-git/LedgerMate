import { StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import Sizes from '../../theme/Sizes';

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
    gap: 30,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 45,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardIconContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: Colors.cardBackground,
    borderRadius: 50,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default styles;
