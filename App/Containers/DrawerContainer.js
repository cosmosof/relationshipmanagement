import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import LoginActions from '../Redux/LoginRedux'

import Colors from '../Themes/Colors'


class DrawerContainer extends React.Component {
  onpresshandler () {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,  // black magic
      actions: [NavigationActions.navigate({ routeName: 'NotLoggedInStack' })]
    })
    this.props.navigation.dispatch(actionToDispatch);
    this.props.logout();
  }

  
  
 

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <View style={styles.lineBreak}></View>
        <Text
          onPress={() => navigation.navigate('')}
          style={styles.uglyDrawerItem}>
          Home
        </Text>
        <Text
          onPress={() => navigation.navigate('')}
          style={styles.uglyDrawerItem}>
          Theme Colors
        </Text>
        <Text
          onPress={() => navigation.navigate('')}
          style={styles.uglyDrawerItem}>
          Screen 3
        </Text>
        <Text
         onPress={this.onpresshandler.bind(this)}
         style={styles.uglyDrawerItem}>
         Log Out
       </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 22,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.charcoal,
    textAlign: 'left',
    padding: 10,
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 10,
    color: Colors.coal,
  },
  lineBreak: {
    borderWidth: 0.5,
    borderColor: Colors.steel,
    marginBottom: 10,
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logout())
  }
}

export default connect(null, mapDispatchToProps)(DrawerContainer)

