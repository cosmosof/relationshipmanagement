import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getAnswers: ['partnerId'],
  fetchSuccess: ['answers']
})
export const MatchScreenTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
 invitationfromlogin: null,
 answers: null
})

/* ------------- Reducers ------------- */

export const fetchanswers = (state, { partnerId }) => {
  console.log(partnerId)
  return (
    state.merge( {invitationfromlogin: 'true' })
  )
}
export const fecthanswerssuccess = (state, { answers }) => {
  console.log(answers)
  return (
    state.merge({ answers })
  )
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_ANSWERS]: fetchanswers,
  [Types.FETCH_SUCCESS]: fecthanswerssuccess
})
