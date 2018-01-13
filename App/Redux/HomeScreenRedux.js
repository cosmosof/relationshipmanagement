import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveToken: null,
  saveRequest: ['username', 'token'],
  tokenSuccess: ['token'],
  invitationSuccessed: ['invitation'],
  requestRevoke: null,
  reqInv: ['userId']
})
export const HomeScreenTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
 username: null,
 token: null,
 invitation: null,
 invitationfromlogin: null
})

/* ------------- Reducers ------------- */

export const save = (state, { username, token }) => {
  return (
    state.merge({ username })
  )
}
export const revokereq = (state) => {
  return (
    state.merge({ invitation: 'revoked' })
  )
}

export const reqinv = (state, { userId }) => {
  return (
    state.merge({ invitationfromlogin: 'true' })
  )
}

export const devicetoken = (state) => state

export const success = (state, { token }) => {
  console.log(token)
  return (
    state.merge({ token })
  )
}
export const invitationsuccess = (state, { invitation }) => {
  console.log(invitation)
  return (
    state.merge({ invitation })
  )
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_TOKEN]: devicetoken,
  [Types.REQ_INV]: reqinv,
  [Types.SAVE_REQUEST]: save,
  [Types.TOKEN_SUCCESS]: success,
  [Types.INVITATION_SUCCESSED]: invitationsuccess,
  [Types.REQUEST_REVOKE]: revokereq,

})
