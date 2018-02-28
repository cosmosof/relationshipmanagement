import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  AlertIOS,
  TextInput,
  AsyncStorage,
  AppState,
  LayoutAnimation,
  Keyboard
} from 'react-native';
import Colors from '../Themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import FullButton from '../Components/FullButton';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import HomeScreenActions from '../Redux/HomeScreenRedux';
import styles from './Styles/HomeScreenStyles';
import { Images, Metrics } from '../Themes';
import * as Animatable from 'react-native-animatable';
import Card from '../Themes/Card';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    //const { state, setParams } = navigation;
    const {params = {}} = navigation.state;

    //const warningIconBackgroundColor = this.state;
    console.log(params)
    //console.log(navigation.state.params.warningIconBackgroundColor)
    return {
      headerLeft: (
        <Icon
          name='ios-information-circle-outline'
          size={20}
          padding={20}
          style={{ padding: 20 }}
          onPress={() => navigation.navigate('Info')}
        />
      ),
      headerRight: (
        <View>
        <Icon
          name='ios-person-outline'
          size={20}
          padding={20}
          style={{ padding: 20 }}
          onPress={() => navigation.navigate('Profile')}
        /> 
        <View style={{ 
          borderRadius: 50, backgroundColor: params? params.warningIconBackgroundColor : Colors.charcoal, 
          position: 'absolute', right: 10, top: 15, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' }} 
>
<Icon
        name='ios-notifications'
        size={12}
        //padding={20}
        style={{ color: Colors.silver, textAlign: 'center'}} 
        onPress={() => navigation.navigate('Profile')}
      />
        </View>
        
        </View>
       
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
      console.log('auth state')
      console.log(user)
      console.log('auth state changed')
      if (user) {
      }
    }); 
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
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
      //topLogo: {width: 80, height: 40},
      formBottomMargin: 100
    });
    console.log(this.state.visibleHeight);
  };

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      //topLogo: {width: 100, height: 50},
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


  componentWillReceiveProps(newProps) {
    console.log(newProps);
    console.log(newProps.token);
  
       if( newProps.isemailverified !==  this.props.isemailverified ){
        console.log('emailverified changed');
        console.log(newProps.isemailverified);
        const {setParams} = this.props.navigation;
        setParams({ warningIconBackgroundColor: Colors.transparent })
      }  else if(!newProps.isemailverified&&!this.state.isemailverified) {
        console.log('emailverified changed 2');
        this.setState({ isemailverified: true });
        const {setParams} = this.props.navigation;
        setParams({ warningIconBackgroundColor: Colors.charcoal })
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
        contentContainerStyle={{
          //flex: 1,
          //alignItems: 'center',
          flexGrow: 1,
          justifyContent: 'center'
        }}
        style={[styles.container]}
        keyboardShouldPersistTaps='always'
      >
        {/* 
        //          <View style={{height: this.state.visibleHeight, backgroundColor: Colors.bloodOrange}}>

                this.props.fetchingMatchedPeer ?   
                  <Text> Fetching </Text>
                    :
                  (
                    this.props.invitation ? 
                      ( 
                        this.props.invAccepted ? 
                        <Text>you are connected</Text> 
                          : 
                        (
                          this.props.fetchingMatchRequest ? <Text> Fethcing< /Text> 
                          :                           
                          <Text>invitation from: {Object.values(this.props.invitation)[0]}</Text> 
                        )
                      ) 
                        : 
                      ( 
                        this.props.pendingMatchPeer ? 
                          <Text> Pending REQUEST </Text>
                            : 
                          ( 
                            this.props.connectionSucceed ? 
                              <Text> your are connected </Text>
                                :  
                              <Text> WELCOME PEERLER </Text> 
                          )
                      )
                  )
                    
                */
        this.props.fetchingMatchedPeer ? (
          <Card>
            <View
              style={[
                styles.container,
                {
                  marginBottom: this.state.formBottomMargin,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <View
                style={{
                  height: 40,
                  width: '10%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10,
                  borderRadius: 50
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '40%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '50%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 50
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '50%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />
            </View>
          </Card>
        ) : this.props.invitation ? (
          this.props.invAccepted ? (
            <Card>
              <View
                style={[
                  styles.container,
                  {
                    marginBottom: this.state.formBottomMargin,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                ]}
              >
                <View>
                  <Icon
                    name='ios-checkmark-circle-outline'
                    size={40}
                    padding={10}
                    style={{ alignSelf: 'center' }}
                    color={Colors.lightMatPurple}
                  />
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      marginBottom: 10
                    }}
                  >
                    {Object.values(this.props.invitation)[0]}
                  </Text>
                  <Text style={{ alignSelf: 'center', marginBottom: 20 }}>
                    connected with you
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 30 }}>
                  <View>
                    <Icon
                      name='ios-checkmark'
                      size={32}
                      padding={2}
                      style={{ alignSelf: 'center', marginRight: 5 }}
                      color={Colors.lightMatPurple}
                      onPress={() =>
                        this.props.navigation.navigate('MatchScreen')
                      }
                    />
                  </View>
                  <View>
                    <Text style={{ marginTop: 6 }}>
                      you will get to see peer’s questions-answers
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 60 }}>
                  <View>
                    <Icon
                      name='ios-checkmark'
                      size={32}
                      padding={2}
                      style={{ alignSelf: 'center', marginRight: 5 }}
                      color={Colors.lightMatPurple}
                      onPress={() =>
                        this.props.navigation.navigate('MatchScreen')
                      }
                    />
                  </View>
                  <View>
                    <Text style={{ marginTop: 6 }}>
                      peer will get to see your questions-answers
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={this.props.handleDeclineInvitation}>
                  <Text style={{ textAlign: 'center', color: Colors.ember }}>
                    DELETE THIS CONNECTION
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          ) : this.props.fetchingMatchRequest ? (
            <Card>
              <View
                style={[
                  styles.container,
                  {
                    marginBottom: this.state.formBottomMargin,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                ]}
              >
                <View
                  style={{
                    height: 40,
                    width: '10%',
                    backgroundColor: Colors.lightGray,
                    marginTop: 10,
                    borderRadius: 50
                  }}
                />

                <View
                  style={{
                    height: 40,
                    width: '40%',
                    backgroundColor: Colors.lightGray,
                    marginTop: 10
                  }}
                />

                <View
                  style={{
                    height: 40,
                    width: '70%',
                    backgroundColor: Colors.lightGray,
                    marginTop: 10
                  }}
                />

                <View
                  style={{
                    height: 40,
                    width: '70%',
                    backgroundColor: Colors.lightGray,
                    marginTop: 10
                  }}
                />

                <View
                  style={{
                    height: 40,
                    width: '50%',
                    backgroundColor: Colors.lightGray,
                    marginTop: 50
                  }}
                />

                <View
                  style={{
                    height: 40,
                    width: '50%',
                    backgroundColor: Colors.lightGray,
                    marginTop: 10
                  }}
                />
              </View>
            </Card>
          ) : (
            <Card>
              <View
                style={[
                  styles.container,
                  {
                    marginBottom: this.state.formBottomMargin,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }
                ]}
              >
                <View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      maxHeight: 30
                    }}
                  >
                    <Animatable.View
                      animation='flash'
                      easing='ease-in-out'
                      iterationCount={20}
                    >
                      <Icon
                        name='ios-mail-outline'
                        size={32}
                        padding={10}
                        style={{}}
                        color={Colors.lightMatPurple}
                        onPress={() =>
                          this.props.navigation.navigate('MatchScreen')
                        }
                      />
                    </Animatable.View>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      marginBottom: 10
                    }}
                  >
                    {Object.values(this.props.invitation)[0]}
                  </Text>
                  <Text style={{ alignSelf: 'center', marginBottom: 20 }}>
                    wants to connect with you
                  </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 30 }}>
                  <View>
                    <Icon
                      name='ios-checkmark'
                      size={32}
                      padding={2}
                      style={{ alignSelf: 'center', marginRight: 5 }}
                      color={Colors.lightMatPurple}
                      onPress={() =>
                        this.props.navigation.navigate('MatchScreen')
                      }
                    />
                  </View>
                  <View>
                    <Text style={{ marginTop: 6 }}>
                      you will get to see peer’s questions-answers
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 60 }}>
                  <View>
                    <Icon
                      name='ios-checkmark'
                      size={32}
                      padding={2}
                      style={{ alignSelf: 'center', marginRight: 5 }}
                      color={Colors.lightMatPurple}
                      onPress={() =>
                        this.props.navigation.navigate('MatchScreen')
                      }
                    />
                  </View>
                  <View>
                    <Text style={{ marginTop: 6 }}>
                      peer will get to see your questions-answers
                    </Text>
                  </View>
                </View>

                <View style={[styles.loginRow]}>
                  <TouchableOpacity
                    style={styles.doubleButtonRow}
                    onPress={this.props.handleAcceptInvitation}
                  >
                    <View style={styles.resButton}>
                      <Text style={styles.buttonText}>Accept</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.doubleButtonRow}
                    onPress={this.props.handleDeclineInvitation}
                  >
                    <View style={styles.resButton}>
                      <Text style={styles.buttonText}>Decline</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          )
        ) : this.props.pendingMatchPeer ? (
          <Card>
            <View
              style={[
                styles.container,
                {
                  marginBottom: this.state.formBottomMargin,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <View>
                <View>
                  <Icon
                    name='ios-clock-outline'
                    size={40}
                    padding={10}
                    style={{ alignSelf: 'center' }}
                    color={Colors.lightMatPurple}
                  />
                  <Text style={{ alignSelf: 'center', marginBottom: 20 }}>
                    waiting for
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      marginBottom: 10
                    }}
                  >
                    {this.state.friendname
                      ? this.state.friendname
                      : this.props.approvedUsername}'s Approval
                  </Text>
                  <TouchableOpacity
                    onPress={this.props.handleDeclineInvitation}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: Colors.ember,
                        marginTop: 20
                      }}
                    >
                      DELETE THIS REQUEST
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Card>
        ) : this.props.connectionSucceed ? (
          <Card>
            <View
              style={[
                styles.container,
                {
                  marginBottom: this.state.formBottomMargin,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <View>
                <Icon
                  name='ios-checkmark-circle-outline'
                  size={40}
                  padding={10}
                  style={{ alignSelf: 'center' }}
                  color={Colors.lightMatPurple}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    marginBottom: 10
                  }}
                >
                  {this.props.approvedPeerName}
                </Text>
                <Text style={{ alignSelf: 'center', marginBottom: 20 }}>
                  connected with you
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', maxHeight: 30 }}>
                <View>
                  <Icon
                    name='ios-checkmark'
                    size={32}
                    padding={2}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                    color={Colors.lightMatPurple}
                    onPress={() =>
                      this.props.navigation.navigate('MatchScreen')
                    }
                  />
                </View>
                <View>
                  <Text style={{ marginTop: 6 }}>
                    you will get to see peer’s questions-answers
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', maxHeight: 60 }}>
                <View>
                  <Icon
                    name='ios-checkmark'
                    size={32}
                    padding={2}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                    color={Colors.lightMatPurple}
                    onPress={() =>
                      this.props.navigation.navigate('MatchScreen')
                    }
                  />
                </View>
                <View>
                  <Text style={{ marginTop: 6 }}>
                    peer will get to see your questions-answers
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.props.handleDeclineInvitation}>
                <Text style={{ textAlign: 'center', color: Colors.ember }}>
                  DELETE THIS CONNECTION
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        ) : this.props.peerNameFetching ? (
          <Card>
            <View
              style={[
                styles.container,
                {
                  marginBottom: this.state.formBottomMargin,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <View
                style={{
                  height: 40,
                  width: '10%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10,
                  borderRadius: 50
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '40%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '70%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '50%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 50
                }}
              />

              <View
                style={{
                  height: 40,
                  width: '50%',
                  backgroundColor: Colors.lightGray,
                  marginTop: 10
                }}
              />
            </View>
          </Card>
        ) : (
          <Card>
            <View
              style={[
                styles.container,
                {
                  marginBottom: this.state.formBottomMargin,
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              ]}
            >
              <View>
                <Icon
                  name='ios-send-outline'
                  size={40}
                  padding={10}
                  style={{ alignSelf: 'center' }}
                  color={Colors.steel}
                  onPress={() => this.props.navigation.navigate('MatchScreen')}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 20,
                    marginBottom: 10
                  }}
                >
                  Welcome to Peerler
                </Text>
                <Text style={{ alignSelf: 'center', marginBottom: 20 }}>
                  Start by connecting your partner
                </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', maxHeight: 30 }}>
                <View>
                  <Icon
                    name='ios-checkmark'
                    size={32}
                    padding={2}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                    color={Colors.lightMatPurple}
                    onPress={() =>
                      this.props.navigation.navigate('MatchScreen')
                    }
                  />
                </View>
                <View>
                  <Text style={{ marginTop: 6 }}>
                    get the app username and send invititation
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', maxHeight: 30 }}>
                <View>
                  <Icon
                    name='ios-checkmark'
                    size={32}
                    padding={2}
                    style={{ alignSelf: 'center', marginRight: 5 }}
                    color={Colors.lightMatPurple}
                    onPress={() =>
                      this.props.navigation.navigate('MatchScreen')
                    }
                  />
                </View>
                <View>
                  <Text style={{ marginTop: 6 }}>
                    make sure your partner downloaded the app
                  </Text>
                </View>
              </View>

              <View style={styles.row}>
                <TextInput
                  ref='username'
                  style={styles.textInput}
                  value={friendname}
                  keyboardType='default'
                  returnKeyType='next'
                  autoCapitalize='none'
                  autoCorrect={false}
                  onChangeText={this.handleChangeFriendname}
                  underlineColorAndroid='transparent'
                  placeholder='peer username'
                />
              </View>
              <View>
                <Text style={styles.warningTexInvite}>
                  {this.props.peerNameFoundError}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.inviveButtonRow}
                onPress={this.handlePressFindFriend}
              >
                <View style={styles.inviteButton}>
                  <Text style={styles.buttonText}>Invite Peer</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
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
