import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
  },
  form: {
    //alignSelf: 'center',
    //flex: 1,
    //flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4,
    minWidth: 360,
    maxWidth: 440,
    borderWidth: 1,
		borderRadius: 2,
		borderColor: '#D5DEE5',
		borderBottomWidth: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
    shadowRadius: 2,
    //marginTop: 50
  },
  row: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    minWidth: 320

  },
  titleRow: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    minWidth: 320
  },
  formLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.cloud,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.silver,
    minWidth:220
  },
  forgotPasswordRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    minWidth: 320
  },
  forgotPasswordText: {
    color: Colors.charcoal,
    fontSize: 12
  },
  warningTexPasswordRecovery: {
    fontSize: 12,
    color: Colors.darkMatPurple,
    textAlign: 'left',
    minWidth: 320,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  warningTex: {
    fontSize: 12,
    color: Colors.darkMatPurple,
    paddingTop: Metrics.baseMargin
  },
  warningTexForCreate: {
    fontSize: 12,
    color: Colors.fire,
    paddingTop: Metrics.baseMargin,
    textAlign: 'center',
    alignSelf: 'center'
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    minWidth: 320

  },
  warningRow: {
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  warningRowForPasswordRecovery: {
    //paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  warningRowForCreate: {
    paddingBottom: Metrics.smallMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButtonLeft: {
    flex: 1,
    borderColor: Colors.darkMatPurple,
    backgroundColor: Colors.medMatPurple,
    padding: 6,
    borderWidth: 1,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderRightWidth: 0
  },
  loginButtonRight: {
    flex: 1,
    borderColor: Colors.medMatPurple,
    backgroundColor: Colors.lightMatPurple,
    padding: 6,
    borderWidth: 1,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderLeftWidth: 0 
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.darkMatPurple,
    backgroundColor: Colors.medMatPurple,
    padding: 6,
    borderRadius: 2
  },
  loginText: {
    textAlign: 'center',
    color: Colors.ricePaper
  },
  loginTextBold: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.silver
  },
  contentContainer: {
    flexGrow: 1, justifyContent: 'center', alignItems: 'center'
  },
  topLogo: {
    width: 100, 
    height: 50,
    marginBottom: 20
  }
})
