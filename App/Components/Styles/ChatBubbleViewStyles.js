import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 12,
    margin: 3,
    minWidth: 100,
    marginRight: 5
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
  },
  triangle: {
    position: 'absolute',
    right: 0,
    top: -19,
    width: 10,
    borderWidth: 8,
    marginRight: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  }, 
  dateText: {
    color: Colors.charcoal,
    fontFamily: Fonts.type.base,
    fontSize: 6
  }
});
