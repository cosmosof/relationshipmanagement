import React from 'react';
import { Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import InfoScreen from '../Containers/InfoScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import OnboardingScreen from '../Containers/OnboardingScreen';
import ChatScreen from '../Containers/ChatScreen';
import ToDoScreen from '../Containers/ToDoScreen';
import QuestionsScreen from '../Containers/QuestionsScreen';
import LoadingScreen from '../Containers/LoadingScreen';
import HomeScreen from '../Containers/HomeScreen';
import HeaderLogo from '../Components/HeaderLogo';
import { Images, Fonts } from '../Themes';
import Colors from '../Themes/Colors';
import styles from './Styles/NavigationStyles';
import NotLoggedInStack from './NotLoggedInStack';

const MainTab = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <HeaderLogo />
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: 'Profile',
      headerTitleStyle: {
        color: Colors.darkMatPurple2,
        fontFamily: Fonts.type.condensed,
        fontSize: Fonts.size.medium
      }
    })
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: () => ({
      title: 'About',
      headerTitleStyle: {
        color: Colors.darkMatPurple2,
        fontFamily: Fonts.type.condensed,
        fontSize: Fonts.size.medium
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
    navigationOptions: () => ({
      title: 'Messages',
      headerTitleStyle: {
        color: Colors.darkMatPurple2,
        fontFamily: Fonts.type.condensed,
        fontSize: Fonts.size.medium
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
        tabBarLabel: 'Discussions',
        tabBarIcon: ({ focused }) => (
          <Image source={focused ? Images.envelopeFocused : Images.envelope} style={[styles.image]} />
        )
      }
    },
    ToDoTab: {
      screen: ToDoTab,
      navigationOptions: {
        tabBarLabel: 'Lists',
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
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: Colors.coal,
      inactiveTintColor: Colors.darkMatPurple2,
      labelStyle: { fontFamily: Fonts.type.base,
      fontSize: Fonts.size.smaller },    
    }
  }
);


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
