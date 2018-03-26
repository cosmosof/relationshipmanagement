import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 280,
    alignSelf: 'center',
    color: Colors.charcoal,
    marginTop: 30
  },
  sectionText: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'center',
    maxWidth: 360,
    color: Colors.medGray,
    marginTop: 10
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 3,
    marginLeft: 3,
    backgroundColor: Colors.lighterMatPurple
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10
  }
})
