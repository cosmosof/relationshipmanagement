import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, KeyboardAvoidingView, View, Image, Button, TouchableOpacity, AlertIOS, TextInput } from 'react-native'
import {Images, Metrics} from '../Themes'
import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TestScreenStyle'

class InviteScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: <View style={{ width: 79, height: 22}}>
        <Image source={Images.peerler} style={{width: 79, height: 22}} />
      </View>,
      //headerTitleStyle: { color: Colors.ricePaper },
      headerLeft: (
        <Icon
          name= "ios-information-circle-outline"
          size={20}
          padding= {20}
          style={{padding: 20}}
          //color= {Colors.ricePaper}
          onPress={() => navigation.navigate('homeScreen')
          }
        />
        ),
        headerRight: (
          <Icon
            name= "ios-person-outline"
            size={20}
            padding= {20}
            style={{padding: 20}}
            //color= {Colors.ricePaper}
            onPress={() => navigation.navigate('QuestionScreen')
            }
          />
          ),
      };
    };
   
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>InviteScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteScreen)
