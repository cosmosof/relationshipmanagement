import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, AlertIOS, TextInput } from 'react-native'
import Colors from '../Themes/Colors'
import Icon from 'react-native-vector-icons/Ionicons'
import FullButton from '../Components/FullButton';
import firebase from 'firebase';
import { connect } from 'react-redux';
import HomeScreenActions from '../Redux/HomeScreenRedux';
import styles from './Styles/LoginScreenStyles'
import {Images, Metrics} from '../Themes'
import firebaseRN from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
  const {state, setParams} = navigation;
  return {
    title: 'Home',
    headerTitleStyle: { color: Colors.ricePaper },
    headerLeft: (
      <Icon
        name= "ios-menu"
        size={32}
        padding= {20}
        style={{padding: 20}}
        color= {Colors.ricePaper}
        onPress={() => navigation.navigate('DrawerOpen')
        }
      />
      ),
    };
  };
  constructor(props) {
    super(props);
    var firebaseDbh = firebase.database();

    this.state = {
        username: '',
        friendname: '',
        invitation: '',
        dbh: firebaseDbh,
        invitationIncoming: ''
    };


  }
  handleChangeemail = (text) => {
    this.setState({ username: text })
  }
  handleChangeFriendname = (text) => {
    this.setState({ friendname: text })
  }
  handlePressLogin = () => {
    const { username } = this.state;
    const { token } = this.props;
    this.props.saveUsername(username, token)
  }
  handlePressFindFriend = () => {
    const myId = firebase.auth().currentUser.uid;

    firebase.database().ref('/username/' + `${this.state.friendname}`).once('value').then(function(snapshot) {
      var token = (snapshot.val() && snapshot.val().notificationTokens) || 'Anonymous';
      var userId = (snapshot.val() && snapshot.val().Uid) || 'Anonymous';
      console.log(userId)
      console.log(token)
      console.log(myId)
      firebase.database().ref('/matchrequest/' + `${myId}/` + `${userId}`).set(true);
    });
  }
  componentWillMount(){
    this.props.saveDeviceToken();
    this.props.requestInvitations(this.props.userId);


  }
  componentDidMount(){


    //const ref = firebase.database().ref().child('/matchrequest/G2ihIPLkAhNgKkzdwUVyIe0sUX93/')
    //ref.on('value', function (snap) {
      //console.log(snap.val()); 
    //})
   
    //var dbref = this.state.dbh.ref('/matchrequest/G2ihIPLkAhNgKkzdwUVyIe0sUX93/');
   // dbref.on('value', (e) => {
     // console.log(e.val());
      //console.log(Object.keys(e.val())[0]);
      ///this.setState({
        //invitationIncoming: Object.keys(e.val())[0],
    //});
    //})
  }
  
  componentDidUnMount() {
    this.state.dbulref.off('value');
}

  render() {
    const { username } = this.state;
    const { friendname } = this.state


    return (
      <View style={styless.container}>
      <Text>{this.props.invitationfromlogin}</Text>

      <Text>{this.props.question1}</Text>
      <Text>{this.props.question2}</Text>
      <Text>{this.props.question3}</Text>

      <Text style={{marginBottom: 20}}>{this.props.userId}</Text>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount={20} style={{borderWidth: 1,  alignItems: 'center', flexDirection: 'row',
  justifyContent: 'center', backgroundColor: Colors.silver, minHeight: 80, minWidth: 300, maxWidth:320, borderColor: Colors.frost, borderRadius: 2}}>     
        <View style={{paddingRight: 10, paddingLeft: 10, flex: 0.1}}>
        <Icon
            name= "ios-mail-outline"
            size={32}
            padding= {10}
            style={{}}
            color= {Colors.pastelRed}
            onPress={() => this.props.navigation.navigate('MatchScreen')
            }
          />
        </View>
        <View style={{flex: 0.9}}>
        <Text>Your friend {this.props.invitation}'s requesting</Text>

        </View>

       
      </Animatable.View>


       <View style={styles.row}>
            <Text style={styles.rowLabel}>Enter a sharable Username</Text>
            <TextInput
              ref='email'
              style={styles.textInput}
              value={username}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeemail}
              underlineColorAndroid='transparent'
              placeholder='username' />
          </View>
          <View style={{padding:10}}></View>

          <View>
          <View style={{maxHeight: 40}}>
            <TouchableOpacity style={styless.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styless.loginButton}>
                <Text style={styless.loginText}>Create Username</Text>                  
              </View>
            </TouchableOpacity>
        </View>
          </View>
          <View style={{padding:10}}></View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Enter Username</Text>
            <TextInput
              ref='email'
              style={styles.textInput}
              value={friendname}
              keyboardType='default'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleChangeFriendname}
              underlineColorAndroid='transparent'
              placeholder='friendname' />
          </View>
          <View style={{padding:10}}></View>

          <View>
          <View style={{maxHeight: 40}}>
            <TouchableOpacity style={styless.loginButtonWrapper} onPress={this.handlePressFindFriend}>
              <View style={styless.loginButton}>
                <Text style={styless.loginText}>Find username</Text>                  
              </View>
            </TouchableOpacity>
        </View>
          </View>
          <View style={{padding:10}}></View>
        <Text style={{paddingBottom:10}}>Lutfen bu sorulari cevaplayiniz</Text>
        <View style={{maxHeight: 40}}>
            <TouchableOpacity style={styless.loginButtonWrapper} onPress={() => this.props.navigation.navigate("QuestionsScreen")}>
              <View style={styless.loginButton}>
                <Text style={styless.loginText}>Questions</Text>                  
              </View>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonWrapper: {
    flex: 1,
    minWidth: 160
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.lightSalmonPink,
    backgroundColor: Colors.pastelRed,
    padding: 6,
    justifyContent: 'center'
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  }
})

const mapStateToProps = (state) => {
  const { username, token, invitation, invitationfromlogin } = state.homescreen;
  const { userId } = state.login;
  const { question1, question2, question3 } = state.questions;

  return { username, token, invitation, userId, question1, question2, question3, invitationfromlogin };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveDeviceToken: () => dispatch(HomeScreenActions.saveToken()),
    requestInvitations: (userId) => dispatch(HomeScreenActions.reqInv(userId)),
    saveUsername: (username, token) => dispatch(HomeScreenActions.saveRequest(username, token))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)