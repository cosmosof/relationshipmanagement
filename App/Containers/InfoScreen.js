import React, { Component } from 'react'
import { Dimensions, StyleSheet, ScrollView, Text, Linking, KeyboardAvoidingView, View, Image, Button, TouchableOpacity, AlertIOS, TextInput, TouchableHighlight } from 'react-native'
import { Colors, Metrics, Images } from '../Themes'

import Icon from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/InfoScreenStyle'

class InfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      headerLeft: (
        <Icon
          name= "ios-arrow-back"
          size={20}
          padding= {20}
          style={{padding: 20}}
          onPress={() => navigation.navigate('Home')
          }
        />
        ),
      };
    };
  render () {
    var {winheight, winwidth} = Dimensions.get('window');

    return (
      <View style={styles.container}> 

      <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center'
      }}
    >
        <View style={[styles.container]}>
          <Text style={styles.sectionTitle}>This Beta release will be update it soon! We are looking to hear your opinion, please let us know!</Text>
          <TouchableHighlight onPress={() => Linking.openURL('mailto:support@foodonchart.com?subject=Feedback&body=body')}>
          <Icon
                      name='ios-mail-outline'
                      size={36}
                      padding={10}
                      style={{}}
                      color={Colors.charcoal}
                    />
    </TouchableHighlight>
    </View>
      </ScrollView>
      </View>


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

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen)
