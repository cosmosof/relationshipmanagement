import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  sectionTitle: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,    
    lineHeight: 28,
    textAlign: 'center',
    color: Colors.charcoal,
    paddingTop: Metrics.baseMargin
  },
  image: {
    marginTop: 20
  },
  title: {
    fontFamily: Fonts.type.condensed,
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,    
    textAlign: 'center',
    color: Colors.charcoal
  }
});
