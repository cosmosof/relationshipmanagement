import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: 10
  },
  textInput: {
    flex: 0.95,
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },
  typeMessage: {
    backgroundColor: Colors.silver,
    padding: 5,
    flexDirection: 'row'
  },
  containerChat: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eeeeee'
  },
  flatlistContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  placeholder: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  }
});
