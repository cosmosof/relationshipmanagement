import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

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
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.semiBold,
    textAlign: 'center',
    color: Colors.darkMatPurple2,
    paddingTop: Metrics.doubleBaseMargin,
    padding: 10
  },
  sectionUsernameTitle: {
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.medium,
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
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    borderLeftWidth: 0
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.condensed,
  },
  warningRow: {
    paddingBottom: Metrics.smallMargin,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  warningTex: {
    fontSize: Fonts.size.smaller,
    fontFamily: Fonts.type.base,
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
