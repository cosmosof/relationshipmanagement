import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation
} from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/LoginSignupScreenStyles'
import {Images, Metrics, Colors} from '../Themes'
import SignupActions from '../Redux/SignupRedux'

class SignupScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptSignup: PropTypes.func
  }

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      username:'',
      visibleHeight: Metrics.screenHeight,
      topLogo: null,
      error: ''
    }
    this.isAttempting = false
  }

 /*  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      console.log(newProps)
      console.log('goback')
      //this.props.navigation.goBack()
    }
  } */

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 74, height: 22},
      formBottomMargin: 160
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: 100, height: 29},
      formBottomMargin: 0
    })
  }

  handlePressSignup = () => {
    this.setState({ error: null })
    const { email, password } = this.state
    if(password.length<6){
      this.setState({ error: 'Password length must be at least six' })
    } else {
      this.isAttempting = true
      this.props.attemptSignup(email, password)
    }
  }

  handleChangeemail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  handleChangeUsername = (text) => {
    console.log(text)
    this.setState({ username: text })
  }

  handlePressUsername = () => {
    console.log('handlePressUsername')
    this.props.saveUsername(this.state.username);
    //this.props.navigation.navigate("LoginScreen")
  }
  handleSignupCancel = () => {
    this.props.signupCancel();
    this.props.navigation.navigate("SignupScreen")
  }
  render () {
    const { email, password, username } = this.state
    const { fetching } = this.props
    const { error } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInputReadonly
    return (
      <ScrollView contentContainerStyle={[styles.contentContainer]} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logo} style={[styles.topLogo, this.state.topLogo]} />
        <View style={[styles.form, {marginBottom: this.state.formBottomMargin}]}>
          <View style={styles.titleRow}>
            <View style={styles.formLine}>
              {
                this.props.signupsucsess?
                    <Text style={styles.formTitle}>
                      Create Username
                    </Text>
                  :
                  <Text style={styles.formTitle}>
                    Sign Up
                  </Text>
              }  
            </View> 
          </View>
          {
            this.props.signupsucsess?
              <View>
                <View style={[styles.row, {width: 240, alignSelf: 'center', marginTop: 20}]}>
                  <Text style={styles.rowLabel}>Username</Text>
                  <TextInput
                    ref='username'
                    style={[textInputStyle, styles.inputStyle, {borderBottomWidth: 1, borderBottomColor: Colors.silver}]}
                    editable={editable}
                    keyboardType='default'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.handleChangeUsername}
                    underlineColorAndroid='transparent'
                    placeholder='enter your username' 
                  />
                </View>
                <View style={[styles.warningRowForCreate]}>
                  <Text style={styles.warningTexForCreate}>{this.props.error}</Text>
                </View>
                <View style={[styles.loginRow, {width: 180, alignSelf: 'center', marginBottom: 30}]}>
                  <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressUsername}>
                    <View style={styles.loginButton}>
                     <Text style={styles.loginText}>Create</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 10}} onPress={this.handleSignupCancel}>
                     <Text style={styles.cancelText}>Cancel</Text>                  
                </TouchableOpacity>
                </View>
              </View>
              :
              <View style={{ marginBottom: 40}}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Email</Text>
                  <TextInput
                    ref='email'
                    style={[textInputStyle, styles.inputStyle]}
                    value={email}
                    editable={editable}
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={this.handleChangeemail}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={() => this.refs.password.focus()}
                    placeholder='enter your email address' 
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Password</Text>
                  <TextInput
                    ref='password'
                    style={[textInputStyle, styles.inputStyle]}
                    value={password}
                    editable={editable}
                    keyboardType='default'
                    returnKeyType='go'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry
                    onChangeText={this.handleChangePassword}
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.handlePressSignup}
                    placeholder='create your password' 
                  />
                </View>
                <View style={[styles.warningRow]}>
                  <Text style={styles.warningTex}>{this.state.error||this.props.error}</Text>
                </View>
                <View style={[styles.loginRow]}>
                  <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressSignup}>
                    <View style={styles.loginButtonLeft}>
                     <Text style={styles.loginTextBold}>Sign Up</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.loginButtonWrapper} onPress={() => this.props.navigation.navigate("LoginScreen")}>
                    <View style={styles.loginButtonRight}>
                     <Text style={styles.loginText}>Sign In</Text>                  
                    </View>
                  </TouchableOpacity>
                </View>
              </View>      
          }
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {fetching, error, signupsucsess} = state.signup;
  return {
    fetching, error, signupsucsess
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptSignup: (email, password) => dispatch(SignupActions.signupRequest(email, password)),
    saveUsername: (username) => dispatch(SignupActions.saveUsername(username)),
    signupCancel: () =>  dispatch(SignupActions.signupCancel())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
