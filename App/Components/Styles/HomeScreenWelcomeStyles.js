import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  warningTexInvite: {
    fontSize: 10,
    color: Colors.darkMatPurple,
    textAlign: 'center' 
  },
  row: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 6,
    fontWeight: 'bold',
    color: Colors.charcoal 
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
    maxHeight: 30,
    alignSelf: 'flex-start' 
  },
  text: {
    fontSize: 12,
    color: Colors.charcoal,
    marginTop: 6,
    textAlign: 'left' 
  },
  image: { 
    width: 60, 
    height: 60, 
    marginBottom: 10,
    alignSelf: 'center' 
  },
  content: {
    maxWidth: 300
  },
  bottomWrapper: {
    alignSelf: 'center' 

  }
})
