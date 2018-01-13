import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import firebase from 'firebase'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signupRequest: ['email', 'password'],
  signupSuccess: ['email'],
  signupFailure: ['error'],
  logout: null,
  autoLogin: null
})

export const SignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  fetching: false
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
export const success = (state, { email }) =>
  state.merge({ fetching: false, error: null, email })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })
// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin = (state) => state
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: request,
  [Types.SIGNUP_SUCCESS]: success,
  [Types.SIGNUP_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin
})


