import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontSize: 16,
    color: Colors.medGray 
  },
  title: {
    alignSelf: 'center', 
    marginBottom: 30,
    fontSize: 18,
    color: Colors.charcoal 
  },
  image: { 
    width: 40, 
    height: 40, 
    marginBottom: 20 
  },
  deleteText: {
    textAlign: 'center', 
    color: Colors.ember, 
    marginTop: 20 
  }
})
