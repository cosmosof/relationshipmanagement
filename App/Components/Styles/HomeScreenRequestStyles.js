import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

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
    marginBottom: 10,
    color: Colors.charcoal
  },
  subTitle: {
    alignSelf: 'center', 
    marginBottom: 12,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    color: Colors.medGray 
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
    marginTop: 6 
  },
  image: { 
    width: 60, 
    height: 60, 
    marginBottom: 20,
    alignSelf: 'center' 
  },
  buttonRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    marginTop: Metrics.doubleBaseMargin,
    justifyContent: 'center'
  },
  content: {
    maxWidth: 300
  }
});
