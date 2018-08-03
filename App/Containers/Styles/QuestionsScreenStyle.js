import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    maxWidth: 600,
  },
 partnerAnswerText: {
  fontFamily: Fonts.type.base,
  fontSize: Fonts.size.medium,
  color: Colors.medGray,
  lineHeight: 24,
  flexDirection: 'row'
 },
 partnerAnswerTextWarning:{
  fontFamily: Fonts.type.base,
  fontSize: Fonts.size.small,
  color: Colors.darkMatBlue,
  lineHeight: 24,
  flexDirection: 'row'
 },
 partnerAnswerTextTitle: {
  marginTop: 10,
  marginBottom: 10,
  fontFamily: Fonts.type.semiBold,
  fontSize: Fonts.size.medium,
  color: Colors.charcoal
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
  parapraph: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.bloodOrange,
    paddingBottom: 15,
    lineHeight: 24
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
  boxShadow: {
    borderColor: Colors.lightMatBlue,
    shadowColor: Colors.medMatBlue,
		shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
		shadowRadius: 3,
    elevation: 1
  },
  submitAnswersWarningText: {
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.small,
    color: Colors.fire,
    marginBottom: 4,
    textAlign: 'center',
    alignSelf: 'center'
  },
  topWarning: {
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.small,
    color: Colors.medMatBlue2
  } 
})
