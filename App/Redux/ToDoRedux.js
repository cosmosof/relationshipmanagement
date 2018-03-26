import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveUserTodos: ['usermessage', 'userId'],
  saveTodoSuccess: null,
  saveTodoFailure: null,
  fetchUserTodos: null,
  fetchUserTodosSuccess: ['usermesssagedata'],
  fetchUserTodosFailure: null,
  updateTodoStatus: ['todonode', 'nodestatus', 'index'],
  updateTodoSuccess: null,
  updateTodoFailure: null,
  deleteTodo: ['todonode', 'index'],
  deleteTodoSuccess: null,
  deleteTodoFailure: null,
})

export const ToDoTypes = Types
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
  userId: null,
  todonode: null,
  updatetodofetching: false,
  updatetodosuccess: false,
  updatetodofailure: false,
  nodestatus: null,
  index: null,
  deletetodofetching: false,
  deletetodosuccess: false,
  deletetodofailure: false
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
// Update todo status
export const updatetodostatus = (state, { todonode, nodestatus, index }) => {
  console.log(`${todonode} : ${nodestatus} : ${index}`)

  return (
    state.merge({ updatetodofetching: true, updatetodosuccess: false, todonode, nodestatus, index, updatetodofailure: false  })
  )  
}
// Update todo status sucsess
export const updatetodosuccess = (state) => {
  return (
    state.merge({ updatetodofetching: false, updatetodosuccess: true, updatetodofailure: false })
  )  
}
// Update todo status failure
export const updatetodofailure = (state) => {
  return (
    state.merge({  updatetodofetching: false, updatetodosuccess: false, updatetodofailure: true })
  )  
}
// delete todo 
export const deletetodo = (state, { todonode, index }) => {
  console.log(`${todonode}`)

  return (
    state.merge({ index, deletetodofetching: true, deletetodosuccess: false, todonode, deletetodofailure: false  })
  )  
}
// Delete todo  sucsess
export const deletetodosuccess = (state) => {
  return (
    state.merge({ deletetodofetching: false, deletetodosuccess: true, deletetodofailure: false })
  )  
}
// Delete todo  failure
export const deletetodofailure = (state) => {
  return (
    state.merge({  deletetodofetching: false, deletetodosuccess: false, deletetodofailure: true })
  )  
}
/* ------------- Selectors ------------- */

// Is the current user logged in?
//export const isLoggedIn = (loginState) => loginState.email !== null

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_TODOS]: saveusermessage, 
  [Types.SAVE_TODO_SUCCESS]: savemessagesuccess,
  [Types.SAVE_TODO_FAILURE]: savemessagefailure,
  [Types.FETCH_USER_TODOS]: fecthusermessages,
  [Types.FETCH_USER_TODOS_SUCCESS]: fetchusermessagesuccess,
  [Types.FETCH_USER_TODOS_FAILURE]: fetchusermessagefailure,
  [Types.UPDATE_TODO_STATUS]: updatetodostatus,
  [Types.UPDATE_TODO_SUCCESS]: updatetodosuccess,
  [Types.UPDATE_TODO_FAILURE]: updatetodofailure,
  [Types.DELETE_TODO]: deletetodo,
  [Types.DELETE_TODO_SUCCESS]: deletetodosuccess,
  [Types.DELETE_TODO_FAILURE]: deletetodofailure
})



