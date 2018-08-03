import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 10
  },
  textInput: {
    color: Colors.charcoal,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    flex: 0.95,
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 5
  },
  typeMessage: {
    backgroundColor: Colors.silver,
    padding: 5,
    paddingRight: 0,
    flexDirection: 'row'
  },
  flatlistContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  placeholder: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: 'grey',
    textAlign: 'center'
  }
});
