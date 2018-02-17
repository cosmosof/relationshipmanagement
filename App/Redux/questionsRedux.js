import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'
import firebase from 'firebase';


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  questionUpdate: ['prop', 'value'],
  fetchPartnersAnswers: null,
  fetchPartnersAnswersSuccess:['answers', 'fetchpartnersanswerssuccess'],
  fetchPartnersAnswersFailure:['fetchpartnersanswerssuccess'],
  saveUsersAnswers: ['question1', 'question2', 'question3', 'userId'],
  saveAnswersSuccess: ['saveanswerssuccess'],
  saveAnswersFailure: ['error'],
  fetchUsersAnswers: ['userId'],
  fetchUsersAnswersSuccess: ['question1', 'question2', 'question3']
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
  saveanswerssuccess: false,
  userId: null,
  invitationfromlogin: null,
  answers: null,
  fetchusersanswerssuccess: false,
  fetchpartnersanswerssuccess: false,
})

/* ------------- Reducers ------------- */

export const questionsupdate = (state = INITIAL_STATE, { prop, value }) => {
  console.log(prop + value)
  return state.merge({ ...state, [prop]: value })
}

export const saveusersanswers = (state = INITIAL_STATE, { question1, question2, question3, userId }) => {
  console.log(`${question1} / ${question2} / ${question3} / ${userId}`)
  return (
    state.merge({ fetching: true })
  )
}
// Fetch answers
export const fetchusersanswers = (state, { userId }) => {
  console.log(userId)
  return (
    state.merge({ fetching: true, error: null })
  )
}
// we've successfully saved
export const saveanswerssuccess = (state, { saveanswerssuccess }) => {
  console.log(`saveanswerssuccess: ${saveanswerssuccess}`)
  return (
    state.merge({ fetching: false, error: null, saveanswerssuccess })
  )
}
// we've successfully fetch users answers
export const fetchusersanswerssuccess = (state, { question1, question2, question3 }) => {
  console.log(question1)
  return (
    state.merge({ fetching: false, error: null, question1: question1, question2: question2, question3: question3, fetchusersanswerssuccess: true })
  )
}
// we've had a problem saving
export const saveanswersfailure = (state, { error }) => {
    console.log(error)
    return (
      state.merge({ fetching: false, error })
    )
}
export const fetchpartnersanswers = (state) => state

export const fecthpartnersanswerssuccess = (state, { answers, fetchpartnersanswerssuccess }) => {
  console.log(`${answers} / ${fetchpartnersanswerssuccess}`)
  return (
    state.merge({ answers, fetchpartnersanswerssuccess })
  )
}
export const fecthpartnersanswersfailure = (state, { fetchpartnersanswerssuccess }) => {
  console.log(`${fetchpartnersanswerssuccess}`)
  return (
    state.merge({ fetchpartnersanswerssuccess, answers: null })
  )
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.QUESTION_UPDATE]: questionsupdate,
  [Types.SAVE_USERS_ANSWERS]: saveusersanswers,
  [Types.SAVE_ANSWERS_SUCCESS]: saveanswerssuccess,
  [Types.SAVE_ANSWERS_FAILURE]: saveanswersfailure,
  [Types.FETCH_USERS_ANSWERS]: fetchusersanswers,
  [Types.FETCH_USERS_ANSWERS_SUCCESS]: fetchusersanswerssuccess,
  [Types.FETCH_PARTNERS_ANSWERS]: fetchpartnersanswers,
  [Types.FETCH_PARTNERS_ANSWERS_SUCCESS]: fecthpartnersanswerssuccess,
  [Types.FETCH_PARTNERS_ANSWERS_FAILURE]: fecthpartnersanswersfailure
})
