import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deleteUser: ['approvedPeerId'],
  deleteSuccess: ['success'],
  deleteFailure: ['userdeletingerror'],
  deleteUserMessage: null,
  changePassword: ['password'],
  changeUsername: ['newusername', 'userId', 'approvedPeerId'],
  usernameChangeSuccess: ['usernamechangesuccess'],
  usernameChangeFailure: ['usernamechangefailure'],
  passwordChangeSuccess: ['passwordchangesuccess'],
  passwordChangeFailure: ['passwordchangefailure'],
  clearProfile: null,
  resetProfile: null
})

export const ProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  error: null,
  userdeletingerror: null,
  fetching: false,
  deletefetching: false,
  success: false,
  successmessage: false,
  newusername: null,
  password: null,
  usernamechangesuccess: false,
  usernamechangefailure: null,
  passwordchangesuccess: false,
  passwordchangefailure: null,
  userId: null,
  approvedPeerId: null
})

/* ------------- Reducers ------------- */

  
// we are attempting to delete
export const deleteuser = (state, { approvedPeerId }) => {
  return (
    state.merge({ deletefetching: true })
  )  
}
// delete message to user
export const deleteusermessage = (state) => {
  console.log('deleteusermessage')
  return (
    state.merge({ successmessage: true })
  )  
}
// we've deleted user
export const deletesuccess = (state, { success }) => {
  console.log(success)
  return (
    state.merge({ deletefetching: false, success, userdeletingerror: null, deleteUserMessage: null })
  )  
}
// we got an error deleting user
export const deletefailure = (state, { userdeletingerror }) => {
  console.log(userdeletingerror)
  return (
    state.merge({ deletefetching: false, success: false, userdeletingerror })
  )  
}
// we are attempting to change username
export const changeuname = (state, { newusername, userId, approvedPeerId }) => {
  console.log(`${newusername} / ${userId} / ${approvedPeerId}`)
  return (
    state.merge({ newusername, fetching: true, usernamechangefailure: null, usernamechangesuccess: false })
  )  
}
// we've changed username
export const usernamechangesuccess = (state, { usernamechangesuccess }) => {
  console.log(usernamechangesuccess)
  return (
    state.merge({ fetching: false, usernamechangesuccess, usernamechangefailure: null })
  )  
}
// we got an error changing username
export const usernamechangefailure = (state, { usernamechangefailure }) => {
  console.log(usernamechangefailure)
  return (
    state.merge({ fetching: false, usernamechangesuccess: false, usernamechangefailure })
  )  
}
// we are attempting to change password
export const changepword = (state, { password }) => {
  console.log(password)
  return (
    state.merge({ password, fetching: true, passwordchangesuccess: false, passwordchangefailure: null  })
  )  
}
// we've changed password
export const passwordchangesuccess = (state, { passwordchangesuccess }) => {
  console.log(passwordchangesuccess)
  return (
    state.merge({ fetching: false, passwordchangesuccess, passwordchangefailure: null })
  )  
}
// we got an error changing user password
export const passwordchangefailure = (state, { passwordchangefailure }) => {
  console.log(passwordchangefailure)
  return (
    state.merge({ fetching: false, passwordchangesuccess: false, passwordchangefailure })
  )  
}

// Reset to profile states except newusername
export const resetprofile = (state) => {
  return (
    state.merge({ 
      error: null,
      userdeletingerror: null,
      fetching: false,
      deletefetching: false,
      success: false,
      successmessage: false,
      password: null,
      usernamechangesuccess: false,
      usernamechangefailure: null,
      passwordchangesuccess: false,
      passwordchangefailure: null
    })
  )  
}

// we've logged out ...for restable 
export const clearprofile = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_USER]: deleteuser,
  [Types.DELETE_USER_MESSAGE]: deleteusermessage,
  [Types.DELETE_SUCCESS]: deletesuccess,
  [Types.DELETE_FAILURE]: deletefailure,
  [Types.CHANGE_USERNAME]: changeuname,
  [Types.CHANGE_PASSWORD]: changepword, 
  [Types.CLEAR_PROFILE]: clearprofile,
  [Types.RESET_PROFILE]: resetprofile,
  [Types.USERNAME_CHANGE_SUCCESS]: usernamechangesuccess,
  [Types.USERNAME_CHANGE_FAILURE]: usernamechangefailure,
  [Types.PASSWORD_CHANGE_SUCCESS]: passwordchangesuccess,
  [Types.PASSWORD_CHANGE_FAILURE]: passwordchangefailure
})


