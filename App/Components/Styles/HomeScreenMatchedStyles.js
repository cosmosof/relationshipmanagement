import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  username: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontSize: 16,
    color: Colors.charcoal 
  },
  centerRow: {
    flex: 1, 
    flexDirection: 'row', 
    maxHeight: 30 
  },
  text: {
    fontSize: 12,
    color: Colors.charcoal,
    marginTop: 6 
  },
  deleteText: {
    textAlign: 'center', 
    color: Colors.ember, 
    marginTop: 20 
  },
  image: { 
    width: 60, 
    height: 60, 
    marginBottom: 10 
  }
})
