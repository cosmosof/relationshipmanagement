import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 12,
    margin: 3,
    minWidth: 100,
    marginRight: 5
  },
  text: {
    fontSize: 12,
    fontWeight: '500'
  },
  triangle: {
    position: 'absolute',
    right: 0,
    top: -19,
    width: 10,
    borderWidth: 8,
    marginRight: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  }, 
  dateText: {
    color: Colors.charcoal,
    fontSize: 6
  }
})
