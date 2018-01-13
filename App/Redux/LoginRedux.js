import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import firebase from 'firebase'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['email', 'userId'],
  loginFailure: ['error'],
  logout: null,
  autoLogin: ['userId']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email: null,
  error: null,
  fetching: false,
  success: null,
  invitation: null,
  userId: null
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
export const success = (state, { email, userId }) => {
  console.log(userId)
  return (
    state.merge({ fetching: false, error: null, email, userId })
  )
}

// we've had a problem logging in
export const failure = (state, { userId }) =>
  state.merge({ userId })

// we've logged out
export const logout = (state) => INITIAL_STATE

// startup saga invoked autoLogin
export const autoLogin =  (state, { userId }) =>
state.merge({ userId })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout,
  [Types.AUTO_LOGIN]: autoLogin
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.email !== null
