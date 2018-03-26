import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
import { Colors, Metrics } from '../../Themes'

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
  parapraph: {
    fontSize: 14,
    color: Colors.charcoal,
    paddingBottom: 15,
    lineHeight: 24
  },
 partnerAnswerText: {
  fontSize: 14,
  color: Colors.medGray,
  lineHeight: 24,
  flexDirection: 'row'
 },
 partnerAnswerTextWarning:{
  fontSize: 14,
  color: Colors.darkMatBlue,
  lineHeight: 24,
  flexDirection: 'row'
 },
 partnerAnswerTextTitle: {
  marginTop: 10,
  marginBottom: 10,
  color: Colors.charcoal
 },
 partnerAnswerTextLeft: {
  fontSize: 14,
  color: Colors.medGray,
  lineHeight: 24
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
    fontSize: 12,
    color: Colors.fire,
    marginBottom: 4,
    textAlign: 'center',
    alignSelf: 'center'
  },
  topWarning: {
    fontSize: 12,
    color: Colors.medMatBlue2
  } 
})
