import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StackNavigator, DrawerNavigator, addNavigationHelpers } from 'react-navigation'
import TestScreen from '../Containers/TestScreen'
import QuestionsScreen from '../Containers/QuestionsScreen'
import LoadingScreen from '../Containers/LoadingScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoggedInStackNavigator from './LoggedInStackNavigator'
import NotLoggedInStackNavigator from './NotLoggedInStackNavigator'
import DrawerContainer from '../Containers/DrawerContainer'
import AuthenticatedScreen from '../Containers/AuthenticatedScreen'
import AnotherAuthenticatedScreen from '../Containers/AnotherAuthenticatedScreen'
import MatchScreen from '../Containers/MatchScreen'

import Colors from '../Themes/Colors'
import styles from './Styles/NavigationStyles'


//internalStack
const InternalStack = StackNavigator({
  homeScreen: { screen: HomeScreen },
  QuestionsScreen: { screen: QuestionsScreen },
  MatchScreen: { screen: MatchScreen }
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: Colors.pastelRed},
  }
})
InternalStack.navigationOptions = {
    header: null
};
// drawer stack
const DrawerStack = DrawerNavigator({
  homeScreen: { screen: InternalStack },
  AuthenticatedScreen: { screen: AuthenticatedScreen },
  AnotherAuthenticatedScreen: { screen: AnotherAuthenticatedScreen }

}, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  gesturesEnabled: false,
  contentComponent: DrawerContainer
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none',
  navigationOptions: ({navigation}) => ({
    title: 'Drawer',
    headerStyle: {backgroundColor: Colors.pastelRed},
    gesturesEnabled: false,
    animationEnabled: false,
    headerLeft: <Text onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }}>Menum</Text>
  })
})





// Manifest of possible screens
export const PrimaryNav = StackNavigator({
  TestScreen: { screen: TestScreen },
  LoadingScreen: { screen: LoadingScreen },
  drawerStack: { screen: DrawerNavigation },
  NotLoggedInStack: { screen: NotLoggedInStackNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
})

const Navigation = ({ dispatch, navigation }) => {
  return (
    <PrimaryNav
      navigation={addNavigationHelpers({ dispatch, state: navigation })}
    />
  )
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    navigation: state.navigation
  }
}

// export default PrimaryNav
export default connect(mapStateToProps)(Navigation)
