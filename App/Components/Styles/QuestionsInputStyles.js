import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  compenentContainer: {
    flex: 1,
  },
  textInputStyle: {
    minHeight: 80,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.steel,
    color: Colors.charcoal,
    fontSize: 14,
    backgroundColor: Colors.snow,
    marginBottom: 3
  },
  title: {    
    fontSize: 16,
    color: Colors.coal,
    paddingBottom: 5,
    lineHeight: 28,
    marginBottom: 20,
    marginTop: 10
  },
  titleBold: {
    fontSize: 16,
    color: Colors.coal,
    paddingBottom: 5,
    lineHeight: 28,
    fontWeight: 'bold',
    marginTop: 15
  },
  lineBreak: {
    borderWidth: 0.5,
    borderColor: Colors.steel,
    marginBottom: 10
  },
  textCounter: {
    fontSize: 8,
    color: Colors.lightMatBlue,
    height: 12
  }   
})
