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
import {Images, Metrics} from '../Themes'
import LoginActions from '../Redux/LoginRedux'

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  isAttempting = false
  keyboardDidShowListener = {}
  keyboardDidHideListener = {}

  constructor (props) {
    super(props)
    this.state = {
      email: 'kahramanmm@gmail.com',
      password: '123456',
      visibleHeight: Metrics.screenHeight,
      //topLogo: { width: Metrics.screenWidth },
      topLogo: null,
      loginerror: '',
      formBottomMargin: 0
    }
    this.isAttempting = false
  }

/*   componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    if (this.isAttempting && !newProps.fetching) {
      this.props.navigation.goBack()
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
    console.log(Metrics.screenHeight)
    console.log(e.endCoordinates.height)

    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 80, height: 40},
      formBottomMargin: 160
    })
    console.log(this.state.visibleHeight)

  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: 100, height: 50},
      formBottomMargin: 0
    })
  }

  handlePressLogin = () => {
    const { email, password } = this.state
    this.isAttempting = true

    this.props.attemptLogin(email, password)
    
  }

  handleEmailText = (text) => {
    this.setState({ email: text })
  }

  handlePasswordText = (text) => {
    this.setState({ password: text })
  }

  handleForgotPassword = () => {
    const { email } = this.state
    this.props.resetPassword(email);
  }

  render () {
    const { email, password } = this.state
    const { fetching } = this.props
    const { loginerror } = this.props
    const editable = !fetching
    const textInputStyle = editable ? styles.textInput : styles.textInput
    return (
      <ScrollView contentContainerStyle={[styles.contentContainer]} style={[styles.container, {height: this.state.visibleHeight}]} keyboardShouldPersistTaps='always'>
        <Image source={Images.logo} style={[styles.topLogo, this.state.topLogo]} />
        <View style={[styles.form, {marginBottom: this.state.formBottomMargin}]}>
          <View style={styles.titleRow}>
            <View style={styles.formLine}>
              <Text style={styles.formTitle}>
                Sign In
              </Text>
            </View> 
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>email</Text>
            <TextInput
              ref='email'
              style={textInputStyle}
              value={email}
              editable={editable}
              keyboardType='email-address'
              returnKeyType='next'
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={this.handleEmailText}
              underlineColorAndroid='transparent'
              onSubmitEditing={() => this.refs.password.focus()}
              placeholder='email' />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Password</Text>
            <TextInput
              ref='password'
              style={textInputStyle}
              value={password}
              editable={editable}
              keyboardType='numeric'
              returnKeyType='go'
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handlePasswordText}
              underlineColorAndroid='transparent'
              onSubmitEditing={this.handlePressLogin}
              placeholder='Password' />
          </View>
          <View style={[styles.warningRow]}>
            <Text style={styles.warningTex}>{this.props.loginerror}</Text>
          </View>
          <View style={[styles.loginRow]}>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButtonLeft}>
                <Text style={styles.loginTextBold}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButtonWrapper} onPress={() => this.props.navigation.navigate("SignupScreen")}>
              <View style={styles.loginButtonRight}>
                <Text style={styles.loginText}>Sign Up</Text>                  
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.warningRowForPasswordRecovery]}>
            <Text style={styles.warningTexPasswordRecovery}>{this.props.resetpasswordfailure}</Text>
          </View>
          <View style={styles.forgotPasswordRow}>
          <TouchableOpacity onPress={this.handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          </View>
        
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  const {fetching, loginerror, resetpasswordfetching, resetpasswordfailure} = state.login;
  return {
    fetching, loginerror, resetpasswordfetching, resetpasswordfailure
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(LoginActions.loginRequest(email, password)),
    resetPassword: (email) => dispatch(LoginActions.resetPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
