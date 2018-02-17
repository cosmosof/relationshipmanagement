import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.vividBlue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#183446',
    paddingTop: Metrics.doubleBaseMargin
  }
})
