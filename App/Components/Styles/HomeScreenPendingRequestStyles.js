import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.medGray 
  },
  title: {
    alignSelf: 'center', 
    marginBottom: 30,
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal 
  },
  image: { 
    width: 40, 
    height: 40, 
    marginBottom: 20 
  },
  deleteText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    textAlign: 'center', 
    color: Colors.ember, 
    marginTop: 20 
  }
});
