import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 20
  },
  contentSection: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.charcoal,
    paddingTop: Metrics.doubleBaseMargin,
    padding: 10
  },
  sectionUsernameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.charcoal,
    padding: 10
  },
  textInput: {
    backgroundColor:  Colors.lightGray,
    height: 36,
    padding: 10,
    borderRadius: 2,
    width: 200,
    marginTop: 5
  },
  buttonWrapper: {
    backgroundColor: Colors.medMatPurple,
    height: 36,
    padding: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.darkMatPurple,
    width: 200
  },
  buttonWrapperDoubleButtonsLeft: {
    backgroundColor: Colors.medMatPurple,
    height: 36,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.darkMatPurple,
    width: 100,
    borderWidth: 1,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderRightWidth: 0
  },
  buttonWrapperDoubleButtonsRight: {
    backgroundColor: Colors.lightMatPurple,
    height: 36,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.medMatPurple,
    width: 100,
    borderWidth: 1,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderLeftWidth: 0
  },
  buttonText: {
    color: Colors.ricePaper,
    textAlign: 'center',
    fontSize: 13
  },
  warningRow: {
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  warningTex: {
    fontSize: 12,
    color: '#457B9D'
  },
  toggleInput: {
    borderBottomWidth: 1,
    marginBottom: 20
  },
  sectionLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkMatPurple,
    width: 280,
    marginBottom: 40,
    marginTop: 40
  }
});
