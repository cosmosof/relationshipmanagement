/* import React from 'react';
import { Image, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen'
import LaunchScreen2 from '../Containers/LaunchScreen2'
import HeaderLogo from '../Components/HeaderLogo';
import { Images, Metrics } from '../Themes';
import Colors from '../Themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
//import InfoScreen from '../Containers/InfoScreen';
//import LoginScreen from '../Containers/LoginScreen';
//import SignupScreen from '../Containers/SignupScreen';
//import ProfileScreen from '../Containers/ProfileScreen';
import OnboardingScreen from '../Containers/OnboardingScreen';
//import ChatScreen from '../Containers/ChatScreen';
//import ToDoScreen from '../Containers/ToDoScreen';
//import QuestionsScreen from '../Containers/QuestionsScreen';
//import LoadingScreen from '../Containers/LoadingScreen';
//import HomeScreen from '../Containers/HomeScreen';
import NotLoggedInStack from './NotLoggedInStack';
import styles from './Styles/NavigationStyles';


const MainTab = StackNavigator({
  Home: {
    screen: LaunchScreen,
    navigationOptions: {
      headerTitle: <HeaderLogo />
    }
  }
});
const QuestionsTab = StackNavigator({
  Questions: {
    screen: LaunchScreen2,
    navigationOptions: () => ({
      headerTitle: <HeaderLogo />
    })
  }
});
const StacksInTabs = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? Images.houseFocused : Images.house} style={[styles.image]} />
        )
      }
    },
    QuestionsTab: {
      screen: QuestionsTab,
      navigationOptions: {
        tabBarLabel: 'Questions',
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? Images.envelopeFocused : Images.envelope} style={[styles.image]} />
        )
      }
    },
  },
  {
    lazy: true,
    initialRouteName: 'MainTab',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.charcoal
    }
  }
);
// Manifest of possible screens
export const PrimaryNav = StackNavigator(
  {  
    NotLoggedInStack: { screen: NotLoggedInStack },  
    StacksInTabs: { screen: StacksInTabs },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav */
 
import React from 'react';
import { StyleSheet, Text, View, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import InfoScreen from '../Containers/InfoScreen';
import LoginScreen from '../Containers/LoginScreen';
import SignupScreen from '../Containers/SignupScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import OnboardingScreen from '../Containers/OnboardingScreen';
import ChatScreen from '../Containers/ChatScreen';
import ToDoScreen from '../Containers/ToDoScreen';
import QuestionsScreen from '../Containers/QuestionsScreen';
import LoadingScreen from '../Containers/LoadingScreen';
import HomeScreen from '../Containers/HomeScreen';
import HeaderLogo from '../Components/HeaderLogo';
import { Images, Metrics } from '../Themes';
import Colors from '../Themes/Colors';
import styles from './Styles/NavigationStyles';
import NotLoggedInStack from './NotLoggedInStack'

const MainTab = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <HeaderLogo />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Profile',
      headerTitleStyle: {
        color: Colors.darkMatBlue2
      }
    })
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'About',
      headerTitleStyle: {
        color: Colors.darkMatBlue2
      }
    })
  }
});

const QuestionsTab = StackNavigator({
  Questions: {
    screen: QuestionsScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderLogo />
    })
  }
});
const ToDoTab = StackNavigator({
  Todo: {
    screen: ToDoScreen,
    navigationOptions: () => ({
      headerTitle: <HeaderLogo />
    })
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Messages',
      headerTitleStyle: {
        color: Colors.darkMatBlue2
      }
    })
  }
});

const StacksInTabs = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? Images.houseFocused : Images.house} style={[styles.image]} />
        )
      }
    },
    QuestionsTab: {
      screen: QuestionsTab,
      navigationOptions: {
        tabBarLabel: 'Questions',
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? Images.envelopeFocused : Images.envelope} style={[styles.image]} />
        )
      }
    },
    ToDoTab: {
      screen: ToDoTab,
      navigationOptions: {
        tabBarLabel: 'ToDos',
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? Images.postitFocused : Images.postit} style={[styles.image]} />
        )
      }
    }
  },
  {
    lazy: true,
    initialRouteName: 'MainTab',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.charcoal
    }
  }
);

const OnboardingStack = StackNavigator({
  OnboardingScreen: {
    screen: OnboardingScreen,
  },  
},
{
  headerMode: 'none',
  initialRouteName: 'Onboarding'
}) 

// Manifest of possible screens
export const PrimaryNav = StackNavigator(
  {    
    OnboardingStack: { screen: OnboardingScreen },
    LoadingScreen: { screen: LoadingScreen },
    NotLoggedInStack: { screen: NotLoggedInStack },
    StacksInTabs: { screen: StacksInTabs },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

// export default PrimaryNav
export default PrimaryNav;
