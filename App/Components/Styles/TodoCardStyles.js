import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    borderRadius: 2,
    padding: 12,
    margin: 3,
    width: 260,
    flexDirection: 'column'

  },
  row: {
    flexDirection: 'row',
    width: 220 
  },
  checkmarkCirc: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.transparent,
    marginRight: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkmarkCircFilling: {
    width: 14,
    height: 14,
    borderRadius: 7
  },
  dateText: {
    color: Colors.charcoal,
    fontSize: 6,
    marginBottom: -10,
    textAlign: 'right'
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'left'
  },
  paperHoles: {
    width: 17,
    height: 17,
    borderRadius: 7,
    backgroundColor: Colors.snow,
    marginRight: 12,
    marginLeft: 12,
    marginTop: -21
  },
  cardContext: {
    flexDirection: 'column'
  },
  button: {
    justifyContent: 'center'
  }
})
