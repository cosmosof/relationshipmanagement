import React from 'react';
import {
  Alert,
  Text,
  View,
  ScrollView,
  Alert,
  AsyncStorage,
  AppState,
  LayoutAnimation,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Colors from '../Themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreenPreLoader from '../Components/HomeScreenPreLoader';
import HomeScreenWelcome from '../Components/HomeScreenWelcome';
import HomeScreenMatched from '../Components/HomeScreenMatched';
import HomeScreenRequest from '../Components/HomeScreenRequest';
import HomeScreenPendingRequest from '../Components/HomeScreenPendingRequest';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import HomeScreenActions from '../Redux/HomeScreenRedux';
import styles from './Styles/HomeScreenStyles';
import { Metrics } from '../Themes';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Icon
            name='ios-information-circle-outline'
            size={20}
            padding={20}
            style={{ padding: 20, color: Colors.darkMatBlue2 }}
            onPress={() => navigation.navigate('Info')}
          />
        </TouchableWithoutFeedback>
      ),
      headerRight: (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Icon
              name='ios-person-outline'
              size={20}
              padding={20}
              style={{ padding: 20, color: Colors.darkMatBlue2 }}
              onPress={() => navigation.navigate('Profile')}
            />
            <View
              style={{
                borderRadius: 50,
                backgroundColor: params
                  ? params.warningIconBackgroundColor
                  : Colors.charcoal,
                position: 'absolute',
                right: 10,
                top: 15,
                width: 16,
                height: 16,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Icon
                name='ios-notifications'
                size={12}
                //padding={20}
                style={{ color: Colors.silver, textAlign: 'center' }}
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      friendname: '',
      appState: AppState.currentState,
      formBottomMargin: null,
      isemailverified: false
    };
  }
  componentDidMount() {
    console.log('homescreen componentDidMount');
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.getDeviceCurrentToken();
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('auth state');
      console.log(user);
      console.log('auth state changed');
      if (user) {
      }
    });
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide
    );
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleChangeFriendname = text => {
    console.log(text);
    this.setState({ friendname: text });
  };
  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    console.log(Metrics.screenHeight);
    console.log(e.endCoordinates.height);

    this.setState({
      visibleHeight: newSize,
      formBottomMargin: 100
    });
    console.log(this.state.visibleHeight);
  };

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      formBottomMargin: 0
    });
  };
  handlePressFindFriend = () => {
    console.log('find friend called');
    const userId = this.props.userId;
    console.log(userId);
    const username = this.props.newusername
      ? this.props.newusername
      : this.props.username;
    console.log(username);
    const friendname = this.state.friendname;
    console.log(`${userId}/ ${username} / ${friendname}`);

    this.props.handleFindPeer(userId, username, friendname);
  };
  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      firebase.database().goOnline();
    } else if (nextAppState.match(/inactive/)) {
      console.log(nextAppState);
      console.log('App is inactive!');
      firebase.database().goOffline();
    }
    this.setState({ appState: nextAppState });
  };

 
  deleteMatchHandler() {
    Alert.alert(
      'Delete Connection',
      'Are you sure you want to delete this connection?',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          onPress: () => this.props.handleDeclineInvitation()
        }
      ]
    );
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps);
    console.log(newProps.token);

    if (newProps.isemailverified !== this.props.isemailverified) {
      console.log('emailverified changed');
      console.log(newProps.isemailverified);
      const { setParams } = this.props.navigation;
      setParams({ warningIconBackgroundColor: Colors.transparent });
    } else if (!newProps.isemailverified && !this.state.isemailverified) {
      console.log('emailverified changed 2');
      this.setState({ isemailverified: true });
      const { setParams } = this.props.navigation;
      setParams({ warningIconBackgroundColor: Colors.charcoal });
    }

    if (newProps.token) {
      console.log(newProps.token);

      AsyncStorage.getItem('devicetoken')
        .then(value => {
          let savedDeviceToken = value
            ? JSON.parse(value)['StoredDeviceToken']
            : null;
          let savedUserId = value ? JSON.parse(value)['StoredUserId'] : null;
          console.log(savedDeviceToken);
          console.log(savedUserId);

          let obj = {
            StoredDeviceToken: newProps.token,
            StoredUserId: newProps.userId
          };
          console.log(JSON.stringify(obj));

          if (
            savedUserId === null ||
            savedUserId !== newProps.userId ||
            !savedUserId
          ) {
            console.log('new user or first sign in');
            console.log(newProps.token);
            console.log(newProps.userId);
            console.log(JSON.stringify(obj));

            AsyncStorage.setItem('devicetoken', JSON.stringify(obj));
            this.props.saveDeviceToken(newProps.token, newProps.userId);
          } else {
            if (savedDeviceToken === newProps.token) {
              console.log('same token');
            } else {
              console.log('token changed');
              AsyncStorage.setItem('devicetoken', JSON.stringify(obj));
              this.props.saveDeviceToken(newProps.token, newProps.userId);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    const { friendname } = this.state;
    return (
      <ScrollView
        contentContainerStyle={[styles.containerStyle]}
        style={[styles.container]}
        keyboardShouldPersistTaps='always'
      >
        {this.props.fetchingMatchedPeer ? (
          <HomeScreenPreLoader marginBottom={this.state.formBottomMargin} />
        ) : this.props.invitation ? (
          this.props.invAccepted ? (
            <HomeScreenMatched
              onPress={this.deleteMatchHandler.bind(this)}
              approvedPeerName={this.props.approvedPeerName}
            />
          ) : this.props.fetchingMatchRequest ? (
            <HomeScreenPreLoader marginBottom={this.state.formBottomMargin} />
          ) : (
            <HomeScreenRequest
              requestername={Object.values(this.props.invitation)[0]}
              handleAcceptInvitation={this.props.handleAcceptInvitation.bind(
                this
              )}
              handleDeclineInvitation={this.props.handleDeclineInvitation.bind(
                this
              )}
            />
          )
        ) : this.props.pendingMatchPeer ? (
          <HomeScreenPendingRequest
            friendname={this.state.friendname}
            approvedUsername={this.props.approvedUsername}
            handleDeclineInvitation={this.props.handleDeclineInvitation.bind(
              this
            )}
          />
        ) : this.props.connectionSucceed ? (
          <HomeScreenMatched
            onPress={this.deleteMatchHandler.bind(this)}
            approvedPeerName={this.props.approvedPeerName}
          />
        ) : this.props.peerNameFetching ? (
          <HomeScreenPreLoader marginBottom={this.state.formBottomMargin} />
        ) : (
          <HomeScreenWelcome
            handleChangeFriendname={this.handleChangeFriendname.bind(this)}
            handlePressFindFriend={this.handlePressFindFriend}
            marginBottom={this.state.formBottomMargin}
            friendname={this.state.friendname}
            peerNameFoundError={this.props.peerNameFoundError}
          />
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    token,
    invitation,
    invAccepted,
    fetchingMatchedPeer,
    mathcedPeerId,
    pendingMatchPeer,
    connectionDeleted,
    connectionSucceed,
    approvedPeerName,
    approvedPeerId,
    invRejected,
    peerNameFoundError,
    peerNameFetching,
    approvedUsername,
    fetchingMatchRequest
  } = state.homescreen;
  const { userId, username, isemailverified } = state.login;
  const usernameFromSignup = state.signup.username;
  const newusername = state.profile.newusername;

  return {
    username,
    token,
    invitation,
    userId,
    invAccepted,
    fetchingMatchedPeer,
    mathcedPeerId,
    pendingMatchPeer,
    connectionDeleted,
    connectionSucceed,
    approvedPeerName,
    approvedPeerId,
    invRejected,
    peerNameFoundError,
    peerNameFetching,
    approvedUsername,
    fetchingMatchRequest,
    usernameFromSignup,
    newusername,
    isemailverified
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleAcceptInvitation: () => dispatch(HomeScreenActions.acceptInv()),
    handleDeclineInvitation: () => dispatch(HomeScreenActions.declineInv()),
    handleFindPeer: (userId, username, friendname) =>
      dispatch(HomeScreenActions.lookupPeer(userId, username, friendname)),
    getDeviceCurrentToken: () => dispatch(HomeScreenActions.getCurrentToken()),
    saveDeviceToken: (token, userId) =>
      dispatch(HomeScreenActions.saveDeviceToken(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
