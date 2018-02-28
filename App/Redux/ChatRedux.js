import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveUserMessage: ['usermessage', 'userId'],
  saveMessageSuccess: null,
  saveMessageFailure: null,
  fetchUserMessages: null,
  fetchUserMessagesSuccess: ['usermesssagedata'],
  fetchUserMessagesFailure: null
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  usermessage: null, 
  savemessagefetching: false,
  savemessagesuccess: false,
  savemessagefailure: false,
  usermesssagedata: null,
  fetchingmessages: false,
  fetchmessagessuccess: false,
  fetchmessagesfailure: false,
  userId: null
})

/* ------------- Reducers ------------- */

// we're saving the message
export const saveusermessage = (state, { usermessage, userId }) => {
  console.log(`${usermessage} / ${userId}`)
  return (
    state.merge({ savemessagefetching: true, userId })
  )  
}
// Save message success
export const savemessagesuccess = (state) => {
  return (
    state.merge({ savemessagefetching: false, savemessagesuccess: true })
  )  
}
// Save message failure
export const savemessagefailure = (state) => {
  return (
    state.merge({ savemessagefetching: false, savemessagesuccess: false, savemessagefailure: true })
  )  
}
// we're attmpting to fetch user messages
export const fecthusermessages = (state) => {
  return (
    state.merge({ fetchingmessages: true })
  )  
}
// Fetch message success
export const fetchusermessagesuccess = (state, { usermesssagedata }) => {
  console.log(usermesssagedata)
  return (
    state.merge({ fetchingmessages: false, fetchmessagessuccess: true, usermesssagedata })
  )  
}
// Fetch message failure
export const fetchusermessagefailure = (state) => {
  return (
    state.merge({ fetchingmessages: false, fetchmessagessuccess: false, fetchmessagesfailure: true })
  )  
} 

/* ------------- Selectors ------------- */

// Is the current user logged in?
//export const isLoggedIn = (loginState) => loginState.email !== null

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_MESSAGE]: saveusermessage, 
  [Types.SAVE_MESSAGE_SUCCESS]: savemessagesuccess,
  [Types.SAVE_MESSAGE_FAILURE]: savemessagefailure,
  [Types.FETCH_USER_MESSAGES]: fecthusermessages,
  [Types.FETCH_USER_MESSAGES_SUCCESS]: fetchusermessagesuccess,
  [Types.FETCH_USER_MESSAGES_FAILURE]: fetchusermessagefailure
})



