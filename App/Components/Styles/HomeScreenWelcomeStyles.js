import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  warningTexInvite: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.smaller,
    color: Colors.darkMatPurple,
    textAlign: 'center' 
  },
  row: {
    paddingTop: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  title: {
    alignSelf: 'center',
    fontFamily: Fonts.type.condensed,
    fontSize: Fonts.size.regular, 
    marginBottom: 6,
    fontWeight: 'bold',
    color: Colors.charcoal 
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular, 
    color: Colors.charcoal 
  },
  centerRow: {
    flex: 1, 
    flexDirection: 'row', 
    maxHeight: 30,
    alignSelf: 'flex-start' 
  },
  text: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small, 
    color: Colors.charcoal,
    marginTop: 6,
    textAlign: 'left' 
  },
  image: { 
    width: 60, 
    height: 60, 
    marginBottom: 10,
    alignSelf: 'center' 
  },
  content: {
    maxWidth: 300
  },
  bottomWrapper: {
    alignSelf: 'center' 

  }
});
