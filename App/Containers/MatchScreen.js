import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text, View, Image, KeyboardAvoidingView, Button, TouchableOpacity, AlertIOS, TextInput } from 'react-native'
import { connect } from 'react-redux'
import MatchScreenActions from '../Redux/MatchScreenRedux';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import Colors from '../Themes/Colors';

class MatchScreen extends Component {
  static navigationOptions = {
    title: 'Match',
    headerTintColor: Colors.ricePaper,
    headerTitleStyle: { color: Colors.ricePaper },
    headerBackTitleStyle: { color: Colors.ricePaper }
  };
  componentWillMount(){
    this.props.requestQues(this.props.invitation);
  }
  render () {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>Answer's from {this.props.invitation}</Text>
          <Text>{this.props.answers}</Text>

        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
const mapStateToProps = (state) => {
  const { invitation } = state.homescreen;
  const { answers } = state.matchscreen;

  return {
    invitation, answers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestQues: (partnerId) => dispatch(MatchScreenActions.getAnswers(partnerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchScreen)
