import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 20
  },
  sectionTextLast: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    maxWidth: 360,
    color: Colors.medGray,
    marginTop: 30
   },
  image: {
    marginTop: 20
  }
})
