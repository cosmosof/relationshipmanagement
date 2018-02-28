import React from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { StackNavigator, addNavigationHelpers, TabNavigator } from 'react-navigation'
import InviteScreen from '../Containers/InviteScreen'
import InfoScreen from '../Containers/InfoScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import ChatScreen from '../Containers/ChatScreen'
import QuestionsScreen from '../Containers/QuestionsScreen'
import LoadingScreen from '../Containers/LoadingScreen'
import HomeScreen from '../Containers/HomeScreen'
import NotLoggedInStackNavigator from './NotLoggedInStackNavigator'
import {Images, Metrics} from '../Themes'
import Colors from '../Themes/Colors'
import styles from './Styles/NavigationStyles'
/*
// tab stack
const MyTabNav = TabNavigator({
  homeScreen: { screen: HomeScreen },
  QuestionsScreen: { screen: QuestionsScreen }
});

//internalStack
const InternalStack = StackNavigator({
  homeScreen: { screen: MyTabNav },
  QuestionsScreen: { screen: QuestionsScreen },
  TestScreen: { screen: TestScreen }
  
}, {
  headerMode: 'float',
  navigationOptions: {
    //headerStyle: {backgroundColor: Colors.pastelRed},
  
  }
})
InternalStack.navigationOptions = {
    header: null
};
// drawer stack


// Manifest of possible screens
export const PrimaryNav = StackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  InternalStack: { screen: InternalStack },
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
*/


/*

//internalStack
const InternalStack = StackNavigator({
  homeScreen: { screen: HomeScreen },
  InfoScreen: { screen: InfoScreen },
  ProfileScreen: { screen: ProfileScreen }
}, {
  headerMode: 'float',
  navigationOptions: {
    //headerStyle: {backgroundColor: Colors.pastelRed},
  
  }
})
InternalStack.navigationOptions = {
    header: null
};
// drawer stack

// tab stack
const MyTabNav = TabNavigator({
  homeScreen: { screen: InternalStack, navigationOptions: {
      tabBarLabel:"Home",
      tabBarIcon: ({ tintColor }) => <Icon name={"ios-home-outline"} size={30} color={tintColor} />
    } 
  },
  QuestionsScreen: { screen: QuestionsScreen, navigationOptions: {
      tabBarLabel:"Questions",
      tabBarIcon: ({ tintColor }) => <Icon name={"ios-paper-outline"} size={30} color={tintColor} />
    } 
  },
  InviteScreen: { screen: InviteScreen, navigationOptions: {
      tabBarLabel:"Invite",
      tabBarIcon: ({ tintColor }) => <Icon name={"ios-paper-plane-outline"} size={30} color={tintColor} />
    } 
  }
}, {  
  tabBarOptions: {
    activeTintColor: '#222',
  }
});
const wrapNavStack = StackNavigator({
  RootScreen: { screen: MyTabNav },
});

// Manifest of possible screens
export const PrimaryNav = StackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  Home: { screen: wrapNavStack },
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
*/

const MainTab = StackNavigator({
  Home: {
    screen: HomeScreen,
    path: '/',
    navigationOptions: {
      title: <View style={{ width: 79, height: 22}}>
      <Image source={Images.peerler} style={{width: 79, height: 22}} />
    </View>,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title:  'Profile',
    }),
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: ({ navigation }) => ({
      title:  'About',
    }),
  },
});

const QuestionsTab = StackNavigator({
  Questions: {
    screen: QuestionsScreen,
    navigationOptions: () => ({
      title: <View style={{ width: 79, height: 22}}>
      <Image source={Images.peerler} style={{width: 79, height: 22}} />
    </View>,
    }),
  },
  NotifSettings: {
    screen: InfoScreen,
    navigationOptions: {
      title: 'Notifications',
    },
  },
});
const ChatTab = StackNavigator({
  Chat: {
    screen: ChatScreen,
    navigationOptions: () => ({
      title: <View style={{ width: 79, height: 22}}>
      <Image source={Images.peerler} style={{width: 79, height: 22}} />
    </View>,
    }),
  },
  NotifSettings2: {
    screen: InfoScreen,
    navigationOptions: {
      title: 'Notifications',
    },
  },
});

const StacksInTabs = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-home' : 'ios-home-outline'}
            size={26}
            style={{ color: Colors.charcoal }}
          />
        ),
      },
    },
    QuestionsTab: {
      screen: QuestionsTab,
      navigationOptions: {
        tabBarLabel: 'Questions',
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-paper' : 'ios-paper-outline'}
            size={26}
            style={{ color: Colors.charcoal }}
          />
        ),
      },
    },
    ChatTab: {
      screen: ChatTab,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({ focused }) => (
          <Icon
            name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
            size={26}
            style={{ color: Colors.charcoal }}
          />
        ),
      },
    },
  },
  {         
    lazy: true,
    initialRouteName: 'MainTab',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.charcoal,
    },
  }
);

// Manifest of possible screens
export const PrimaryNav = StackNavigator({
  LoadingScreen: { screen: LoadingScreen },
  StacksInTabs: { screen: StacksInTabs },
  NotLoggedInStack: { screen: NotLoggedInStackNavigator }
}, {
  // Default config for all screens
  
  headerMode: 'none',
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
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