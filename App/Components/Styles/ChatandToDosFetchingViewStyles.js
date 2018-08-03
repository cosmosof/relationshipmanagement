import { StyleSheet } from 'react-native';
import { Colors } from '../../Themes/';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 10,
    flex: 1, 
    justifyContent: 'center' 
  },
  lightGrayBox: {
    width: 260, 
    height: 50, 
    marginTop: 10, 
    backgroundColor: Colors.lightGray
  }
})
