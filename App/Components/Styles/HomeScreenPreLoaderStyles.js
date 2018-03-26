import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  width10Style: {
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: Colors.lightGray,
    marginTop: 10
  },
  width40Style: {
    height: 40,
    width: 160,
    backgroundColor: Colors.lightGray,
    marginTop: 10
  },
  width50Style: {
    height: 40,
    width: 180,
    backgroundColor: Colors.lightGray,
    marginTop: 10
  },
  width70Style: {
    height: 40,
    width: 240,
    backgroundColor: Colors.lightGray,
    marginTop: 10
  }
})
