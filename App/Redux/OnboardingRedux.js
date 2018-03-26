import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onboardingtoSignin: null,  
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
})

/* ------------- Reducers ------------- */


// Navigate to signin from onboarding
export const onboardingtosignin = (state) => INITIAL_STATE




/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ONBOARDINGTO_SIGNIN]: onboardingtosignin 
})


