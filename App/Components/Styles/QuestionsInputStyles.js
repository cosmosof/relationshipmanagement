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
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    backgroundColor: Colors.snow,
    marginBottom: 3
  },
  title: { 
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.medium,
    color: Colors.charcoal,
    paddingBottom: 5,
    lineHeight: 28,
    marginBottom: 20,
    marginTop: 10   
  },
  titleBold: {
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
    paddingBottom: 5,
    lineHeight: 28,
    marginTop: 20
  },
  lineBreak: {
    borderWidth: 0.5,
    borderColor: Colors.steel,
    marginBottom: 10
  },
  textCounter: {
    fontSize: Fonts.size.tiny,
    color: Colors.lightMatBlue,
    height: 12
  }   
});
