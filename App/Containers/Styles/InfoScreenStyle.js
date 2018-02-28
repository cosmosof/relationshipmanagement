import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.charcoal,
    paddingTop: Metrics.doubleBaseMargin
  }
})
