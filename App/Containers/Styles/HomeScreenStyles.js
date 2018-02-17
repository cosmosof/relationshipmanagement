import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4,
    minWidth: 320,
    borderWidth: 1,
		borderRadius: 2,
		borderColor: Colors.steel,
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2
  },
  row: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  inviveButtonRow: {
    paddingTop: 5,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  doubleButtonRow: {
    paddingTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.baseMargin
  },
  titleRow: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  formLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    paddingBottom: Metrics.doubleBaseMargin
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.charcoal
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal,
    padding: 10,
    minWidth: 200,
    maxHeight: 40,
    borderWidth: 1,
    borderColor: Colors.steel,
    borderRadius: 2
  },
  warningTex: {
    fontSize: 12,
    color: Colors.fire,
    paddingTop: Metrics.doubleBaseMargin
  },
  warningTexInvite: {
    fontSize: 12,
    color: Colors.darkMatPurple,
    paddingTop: 5
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  warningRow: {
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  inviteButton: {
    minWidth: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.medMatPurple,
    backgroundColor: Colors.lightMatPurple,
    padding: 6,
    justifyContent: 'center'
  },
  resButton: {
    minWidth: 120,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.medMatPurple,
    backgroundColor: Colors.lightMatPurple,
    padding: 6,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.silver
  }
})
