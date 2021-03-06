import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['email', 'userId', 'username'],
  loginFailure: ['loginerror'],
  logout: null,
  autoLogin: ['userId'],
  isEmailVerified: ['isemailverified'],
  resetPassword: ['email'],
  resetPasswordFailure: ['resetpasswordfailure']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  loginerror: null,
  fetching: false,
  success: null,
  invitation: null,
  userId: null,
  username: null,
  isemailverified: false,
  resetpasswordfetching: false,
  resetpasswordsuccess: false,
  resetpasswordfailure: null
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state, { email, password }) => {
  console.log(email + password)
  return (
    state.merge({ fetching: true })
  )  
}


// we've successfully logged in
export const success = (state, { email, userId, username }) => {
  console.log(username)
  return (
    state.merge({ fetching: false, loginerror: null, email, userId, username })
  )
}

// we've had a problem logging in
export const failure = (state, { loginerror }) => {
    console.log(loginerror)
  return (
    state.merge({ loginerror, fetching: false })
  )
}
// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin =  (state, { userId }) =>
state.merge({ userId })

// email verificatin warning 
export const isemailverified = (state, { isemailverified }) => {
  console.log(isemailverified)
  return (
    state.merge({ isemailverified })
  )
}
// attemping to reset password 
export const resetpassword = (state, { email }) => {
  console.log(email)
  return (
    state.merge({ resetpasswordfetching: true, resetpasswordfailure: null })
  )
} 
// password reset failure
export const resetpasswordfailure = (state, { resetpasswordfailure }) => {
  console.log(resetpasswordfailure)
  return (
    state.merge({ resetpasswordfetching: false, resetpasswordfailure })
  )
} //resetpasswordfailure
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin,
  [Types.IS_EMAIL_VERIFIED]: isemailverified,
  [Types.RESET_PASSWORD]: resetpassword,
  [Types.RESET_PASSWORD_FAILURE]: resetpasswordfailure 
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.email !== null
