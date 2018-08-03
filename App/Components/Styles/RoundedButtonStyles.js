import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 36,
    borderRadius: 4,
    marginHorizontal: Metrics.section,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    borderWidth: 1,
    borderColor: Colors.darkMatPurple,
    backgroundColor: Colors.medMatPurple,
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.condensed,
    marginVertical: Metrics.baseMargin
  },
  fetching: {
    height: 36,
    borderRadius: 4,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    borderColor: Colors.silver,
    backgroundColor: Colors.lightGray,
  },
  fetchingInside: {
    height: 6,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 80,
    backgroundColor: Colors.gray,
    marginBottom: 5
  }
});
