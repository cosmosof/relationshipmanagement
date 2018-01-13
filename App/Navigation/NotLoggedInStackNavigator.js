import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import SignupScreen from '../Containers/SignupScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default StackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { title: 'Login' }
  },  
  SignupScreen: { screen: SignupScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})
