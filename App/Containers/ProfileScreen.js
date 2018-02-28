import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  AppState,
  LayoutAnimation,
  Keyboard,
  Alert
} from 'react-native';
import { Images, Metrics, Colors } from '../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ProfileActions from '../Redux/ProfileRedux';
import LoginActions from '../Redux/LoginRedux';
import firebase from 'react-native-firebase';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle';

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      //headerTitleStyle: { color: Colors.ricePaper },
      headerLeft: (
        <Icon
          name='ios-arrow-back'
          size={20}
          padding={20}
          style={{ padding: 20 }}
          //color= {Colors.ricePaper}
          onPress={() => navigation.navigate('Home')}
        />
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      newusername: '',
      newpassword: '',
      isUsernameInputSectionVisible: true,
      toggleInputBottomBorderColorRight: Colors.lightMatPurple,
      toggleInputBottomBorderColorLeft: Colors.darkMatPurple,
      formBottomMargin: null,
      iconSize: 48,
      marginTopTextInput: 5,
      marginBottomSectionLine: 40,
      marginTopSectionLine: 40
    };
  }
  handleChangeUsername = text => {
    console.log(this.state.newusername);
    this.setState({
      newusername: text
    });
  };
  handleChangePassword = text => {
    console.log(this.state.newpassword);
    this.setState({
      newpassword: text
    });
  };
  onpresshandler() {
    // This will reset back to loginStack
    // https://github.com/react-community/react-navigation/issues/1127
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null, // black magic
      actions: [NavigationActions.navigate({ routeName: 'NotLoggedInStack' })]
    });
    this.props.navigation.dispatch(actionToDispatch);
    this.props.logout();
  }
  deletehandler() {
    Alert.alert(
      'Delete User Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          onPress: () => this.props.delete(this.props.approvedPeerId)
        }
      ]
    );
  }
  changeUsernameButton = () => {
    console.log('changeUsernameButton');
    console.log(this.state.newusername);
    let newusername = this.state.newusername;
    console.log(newusername);
    this.props.usernameChange(
      newusername,
      this.props.userId,
      this.props.approvedPeerId
    );
  };
  changePasswordButton = () => {
    console.log('changePasswordButton');
    let password = this.state.newpassword;
    console.log(password);
    this.props.passwordChange(password);
  };
  changeUsernameToggle() {
    this.setState({
      isUsernameInputSectionVisible: true,
      toggleInputBottomBorderColorRight: Colors.lightMatPurple,
      toggleInputBottomBorderColorLeft: Colors.darkMatPurple
    });
  }
  changePasswordToggle() {
    this.setState({
      isUsernameInputSectionVisible: false,
      toggleInputBottomBorderColorRight: Colors.darkMatPurple,
      toggleInputBottomBorderColorLeft: Colors.lightMatPurple
    });
  }
  componentDidMount() {
    console.log('profileScreen componentDidMount');
  }
  componentWillMount() {
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
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }
  keyboardDidShow = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let newSize = Metrics.screenHeight - e.endCoordinates.height;
    console.log(Metrics.screenHeight);
    console.log(e.endCoordinates.height);

    this.setState({
      visibleHeight: newSize,
      formBottomMargin: 180,
      iconSize: 28,
      marginTopTextInput: 0,
      marginBottomSectionLine: 20,
      marginTopSectionLine: 20
    });
    console.log(this.state.visibleHeight);
  };

  keyboardDidHide = e => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      visibleHeight: Metrics.screenHeight,
      formBottomMargin: 0,
      iconSize: 48,
      marginTopTextInput: 5,
      marginBottomSectionLine: 40,
      marginTopSectionLine: 40
    });
  };

  render() {
    const { newusername } = this.state;
    const { newpassword } = this.state;

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
      {this.props.isemailverified ? false : <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        name='ios-notifications'
        size={10}
        style={{paddingRight: 5, paddingTop: 2}} 
      />
      <Text style={{textAlign: 'center', fontSize: 10}}>Please verify your email address!</Text>
      </View> }
      
        {/* {
         this.props.successmessage ?            
            <Text>Successfully DELETED</Text> 
              :
            <Text>main screen</Text> 
       } */}
        {/* 
         <Text> fetching: {this.props.fetching ? 'true' : 'false'}</Text>
        <Text> error: {this.props.error}</Text>
        <Text> success: {this.props.success ? 'true' : 'false'}</Text>
        <Text>
          successmessage: {this.props.successmessage ? 'true' : 'false'}
        </Text> 
        <Text>
        isUsernameInputSectionVisible: {this.state.isUsernameInputSectionVisible ? 'true' : 'false'}
        </Text> 
        <Text>
        isPasswordInputSectionVisible: {this.state.isPasswordInputSectionVisible ? 'true' : 'false'}
        </Text>  */}
        {this.props.successmessage ? (
          <View
            style={[
              styles.contentSection,
              { marginBottom: this.state.formBottomMargin }
            ]}
          >
            <Icon
              name='ios-people-outline'
              size={this.state.iconSize}
              padding={1}
              style={{ textAlign: 'center' }}
              color={Colors.charcoal}
            />
            <Text style={styles.sectionTitle}>Sorry to see you go!</Text>
            <Text style={styles.sectionTitle}>
              Account Successfully Deleted
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.contentSection,
              { marginBottom: this.state.formBottomMargin }
            ]}
          >
            <Icon
              name='ios-people-outline'
              size={this.state.iconSize}
              padding={1}
              style={{ textAlign: 'center' }}
              color={Colors.charcoal}
            />
            <View>
              <Text style={styles.sectionUsernameTitle}>
                {this.props.newusername
                  ? this.props.newusername
                  : this.props.username}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View
                style={[
                  styles.toggleInput,
                  {
                    borderBottomColor: this.state
                      .toggleInputBottomBorderColorLeft
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={this.changeUsernameToggle.bind(this)}
                >
                  <Text style={styles.sectionTitle}>Change Username</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.toggleInput,
                  {
                    borderBottomColor: this.state
                      .toggleInputBottomBorderColorRight
                  }
                ]}
              >
                <TouchableOpacity
                  onPress={this.changePasswordToggle.bind(this)}
                >
                  <Text style={styles.sectionTitle}>Change Password</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                minWidth: 320,
                marginBottom: 10
              }}
            />
            {/*   
              { 
                this.state.isUsernameInputSectionVisible ? 
                  (
                    this.props.fetching ?
                      <Text> FETCHING </Text>
                        :
                      (
                        this.props.usernamechangesuccess ? 
                          <Text> you have successfully changed your username </Text>
                            :
                          <Text>Change username</Text>
                      )
                  )
                    :
                  <Text>Change password</Text>
              } */}
            {this.state.isUsernameInputSectionVisible ? (
              this.props.fetching ? (
                <View>
                  <View
                    style={{
                      marginTop: 7,
                      height: 35,
                      width: 200,
                      backgroundColor: '#1EAFE6'
                    }}
                  />
                  <View
                    style={{
                      marginTop: 20,
                      height: 35,
                      width: 200,
                      backgroundColor: '#1EAFE6'
                    }}
                  />
                </View>
              ) : this.props.usernamechangesuccess ? (
                <Text style={styles.sectionTitle}>
                  {' '}
                  You have successfully changed your username!{' '}
                </Text>
              ) : (
                <View>
                  <View style={styles.row}>
                    <TextInput
                      ref='username'
                      style={[
                        styles.textInput,
                        { marginTop: this.state.marginTopTextInput }
                      ]}
                      value={newusername}
                      keyboardType='default'
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onChangeText={this.handleChangeUsername}
                      underlineColorAndroid='transparent'
                      placeholder='enter new username'
                    />
                  </View>
                  <View style={styles.warningRow}>
                    <Text style={styles.warningTex}>
                      {this.props.usernamechangefailure}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={this.changeUsernameButton}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Change Username</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            ) : this.props.fetching ? (
              <View>
                <View
                  style={{
                    marginTop: 7,
                    height: 35,
                    width: 200,
                    backgroundColor: '#1EAFE6'
                  }}
                />
                <View
                  style={{
                    marginTop: 20,
                    height: 35,
                    width: 200,
                    backgroundColor: '#1EAFE6'
                  }}
                />
              </View>
            ) : this.props.passwordchangesuccess ? (
              <Text style={styles.sectionTitle}>
                You have successfully changed your password!
              </Text>
            ) : (
              <View>
                <View style={styles.row}>
                  <TextInput
                    ref='username'
                    style={[
                      styles.textInput,
                      { marginTop: this.state.marginTopTextInput }
                    ]}
                    value={newpassword}
                    keyboardType='numeric'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.handleChangePassword}
                    underlineColorAndroid='transparent'
                    placeholder='enter new password'
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.warningRow}>
                  <Text style={styles.warningTex}>
                    {this.props.passwordchangefailure}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonWrapper}
                  onPress={this.changePasswordButton}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Change Password</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={[
                styles.sectionLine,
                {
                  marginTop: this.state.marginTopSectionLine,
                  marginBottom: this.state.marginBottomSectionLine
                }
              ]}
            />
            <View style={styles.warningRow}>
                  <Text style={styles.warningTex}>
                    {this.props.userdeletingerror}
                  </Text>
                </View>
            {this.props.deletefetching ? (
                  <View
                    style={{
                      marginTop: 7,
                      height: 35,
                      width: 200,
                      backgroundColor: '#1EAFE6', 
                      alignSelf: 'center'
                    }}
                  />
                ) : ( 
                  <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                style={styles.buttonWrapperDoubleButtonsLeft}
                onPress={this.onpresshandler.bind(this)}
              >
                <Text style={styles.buttonText}> Log Out </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonWrapperDoubleButtonsRight}
                onPress={this.deletehandler.bind(this)}
              >
                <Text style={styles.buttonText}> Delete User </Text>
              </TouchableOpacity>
              </View>
                )} 
            </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const {
    error,
    userdeletingerror,
    fetching,
    deletefetching,
    success,
    successmessage,
    password,
    usernamechangefailure,
    usernamechangesuccess,
    newusername,
    passwordchangefailure,
    passwordchangesuccess
  } = state.profile;
  const { username, userId, isemailverified } = state.login;
  const { approvedPeerId } = state.homescreen;

  return {
    error,
    userdeletingerror,
    fetching,
    deletefetching,
    success,
    successmessage,
    password,
    usernamechangefailure,
    usernamechangesuccess,
    newusername,
    userId,
    username,
    passwordchangefailure,
    passwordchangesuccess,
    approvedPeerId,
    isemailverified
  };
};

const mapDispatchToProps = dispatch => {
  return {
    delete: approvedPeerId =>
      dispatch(ProfileActions.deleteUser(approvedPeerId)),
    logout: () => dispatch(LoginActions.logout()),
    usernameChange: (username, userId, approvedPeerId) =>
      dispatch(ProfileActions.changeUsername(username, userId, approvedPeerId)),
    passwordChange: password =>
      dispatch(ProfileActions.changePassword(password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
