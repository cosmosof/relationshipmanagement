import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  username: {
    alignSelf: 'center',
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
    marginBottom: 10
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.charcoal 
  },
  centerRow: {
    flex: 1, 
    flexDirection: 'row', 
    maxHeight: 30 
  },
  text: {
    fontSize: 12,
    color: Colors.charcoal,
    marginTop: 6 
  },
  deleteText: {
    textAlign: 'center', 
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.ember, 
    marginTop: 20 
  },
  image: { 
    width: 60, 
    height: 60, 
    marginBottom: 10 
  }
});
