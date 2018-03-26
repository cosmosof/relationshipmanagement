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
    color: Colors.snow,
    textAlign: 'center',
    fontSize: 12
  },
  warningRow: {
    paddingBottom: Metrics.smallMargin,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  warningTex: {
    fontSize: 10,
    color: Colors.medMatPurple
  },
  toggleInput: {
    borderBottomWidth: 1,
    marginBottom: 20
  },
  sectionLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.steel,
    width: 280
  },
  image: {
    marginTop: 4,
    height: 40,
    width: 40
  }
});
