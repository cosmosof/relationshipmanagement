import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupRequest: ['email', 'password'],
  signupSuccess: ['email'],
  signupFailure: ['error'],
  saveUsername: ['username'],
  saveUsernameSuccess: ['username'],
  saveUsernameFailure: ['error'],
  logout: null,
  autoLogin: null,
  signupCancel: null
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  fetching: false, 
  signupsucsess: false,
  username: null,
  usernamesucsess: false
})

/* ------------- Reducers ------------- */

// we're attempting to Signup
export const request = (state, { email, password }) => {
  console.log(email + password)
  return (
    state.merge({ fetching: true })
  ) 
} 

// we've successfully logged in
export const success = (state, { email }) => {
  console.log('signup success')
  return (
    state.merge({ fetching: false, error: null, email, signupsucsess: true })
  )
}

// we've had a problem logging in
export const failure = (state, { error }) => {
  console.log('signup fail')
  return(
    state.merge({ fetching: false, error, signupsucsess: false })
  )
}

// save username
export const saveusername = (state, { username }) => {
  console.log(username)
  return (
    state.merge({ fetching: true })
  ) 
} 

// we've successfully saved username
export const saveusernamesuccess = (state, { username }) => {
  console.log('saving username success')
  return (
    state.merge({ fetching: false, error: null, username, usernamesucsess: true, signupsucsess: false })
  )
}

// we've had a problem saving username
export const saveusernamefailure = (state, { error }) => {
  console.log('username saving fail')
  return(
    state.merge({ fetching: false, error, usernamesucsess: false })
  )
}
// signup cancel
export const signupcancel = (state) => INITIAL_STATE

// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin = (state) => state
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
  [Types.SIGNUP_CANCEL]: signupcancel,
  [Types.SAVE_USERNAME]: saveusername,
  [Types.SAVE_USERNAME_SUCCESS]: saveusernamesuccess,
  [Types.SAVE_USERNAME_FAILURE]: saveusernamefailure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin
})


