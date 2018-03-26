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
    marginBottom: 10,
    color: Colors.charcoal
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontSize: 16,
    color: Colors.medGray 
  },
  centerRow: {
    flex: 1, 
    flexDirection: 'row', 
    maxHeight: 30,
    alignSelf: 'center',
    alignSelf: 'flex-start'  
  },
  text: {
    fontSize: 12,
    color: Colors.charcoal,
    marginTop: 6 
  },
  image: { 
    width: 60, 
    height: 60, 
    marginBottom: 20,
    alignSelf: 'center' 
  },
  buttonRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    marginTop: Metrics.doubleBaseMargin
  },
  content: {
    maxWidth: 300
  }
})
