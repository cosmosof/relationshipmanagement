import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'
import firebase from 'firebase';


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  questionUpdate: ['prop', 'value'],
  saveAnswers: ['question1', 'question2', 'question3', 'userId'],
  saveAnswersSuccess: ['success', 'userId'],
  saveAnswersFailure: ['error'],
  fetchAnswers: ['userId'],
  fetchSuccess: ['question1', 'question2', 'question3']
})
export const QuestionsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  question1: null,
  question2: null,
  question3: null,
  fetching: false,
  error: null,
  success: null,
  userId: null
})

/* ------------- Reducers ------------- */

export const update = (state = INITIAL_STATE, { prop, value }) => {
  console.log(prop + value)
  return state.merge({ ...state, [prop]: value })
}

export const answers = (state = INITIAL_STATE, { question1, question2, question3, userId }) => {
  return (
    state.merge({ fetching: true })
  )
}
// Fetch answers
export const fetchanswers = (state, { userId }) => {
  return (
    state.merge({ fetching: true, error: null })
  )
}
// we've successfully saved
export const success = (state, { success, userId }) => {
  return (
    state.merge({ fetching: false, error: null, success, userId })
  )
}
// we've successfully fetch
export const fetchsuccess = (state, { question1, question2, question3 }) => {
  console.log(question1)
  return (
    state.merge({ fetching: false, error: null, question1: question1, question2: question2, question3: question3 })
  )
}
// we've had a problem saving
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QUESTION_UPDATE]: update,
  [Types.SAVE_ANSWERS]: answers,
  [Types.SAVE_ANSWERS_SUCCESS]: success,
  [Types.SAVE_ANSWERS_FAILURE]: failure,
  [Types.FETCH_ANSWERS]: fetchanswers,
  [Types.FETCH_SUCCESS]: fetchsuccess


})
