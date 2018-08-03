import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  sectionTitle: {
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.condensed,
    textAlign: 'center',
    maxWidth: 280,
    alignSelf: 'center',
    color: Colors.charcoal,
    marginTop: 30
  },
  sectionText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium,
    textAlign: 'center',
    maxWidth: 360,
    color: Colors.medGray,
    marginTop: 10
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 3,
    marginLeft: 3,
    backgroundColor: Colors.lighterMatPurple
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10
  }
});
