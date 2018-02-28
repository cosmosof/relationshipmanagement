import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getCurrentToken: null,
  acceptInv: null,
  declineInv: null,
  saveDeviceToken: ['token', 'userId'],
  getCurrentTokenSuccess: ['token'],
  invitationSuccessed: ['invitation'],
  lookupPeer: ['userId', 'username', 'friendname'],
  matchedPeerFailure: ['matchedPeerFailure'],
  getPeerData: ['peerData', 'mathcedPeerId'],
  fetchingMatchedPeer: ['fetchingMatchedPeer'], 
  fetchingMatchRequest: ['fetchingMatchRequest'], 
  pendingMatchPeer: ['pendingMatchPeer'],
  connectionDeleted: ['connectionDeleted'],
  connectionSucceed: ['connectionSucceed', 'approvedPeerName', 'approvedPeerId'],
  fetchingPeerNameLookup: ['peerNameFetching', 'peerNameFoundError'],
  waitingApproval: ['approvedUsername'],
  fetchChatId: ['chatId']
})
export const HomeScreenTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
 username: null,
 token: null,
 invitation: null,
 invAccepted: false,
 friendname: null,
 fetchingMatchedPeer: false,
 pendingMatchPeer: false,
 mathcedPeerId: null,
 matchedPeerFailure: null,
 peerData: null,
 connectionDeleted: false,
 invRejected: false,
 connectionSucceed: false,
 approvedPeerName: null,
 approvedPeerId : null,
 peerNameFoundError: null,
 peerNameFetching: false,
 fetchingMatchRequest: false,
 approvedUsername: null,
 chatId: null
})

/* ------------- Reducers ------------- */

export const savedevicetoken = (state, { token, userId }) => {
  console.log(`${userId}/ ${token}`)
  return (
    state
  )
}
export const invdecline = (state) => {
  console.log('decline')
  return (
    state.merge({ invAccepted: false,  
      invRejected: true
    })
  )
}
export const invaccept = (state) => {
  console.log('accept')
  return (
    state.merge({ invAccepted: true })
  )
}

export const fetchingmatchedpeer = (state, { fetchingMatchedPeer }) => {
  console.log(fetchingMatchedPeer)
  return (
    state.merge({ fetchingMatchedPeer })
  )
}
export const fetchingmatchrequest = (state, { fetchingMatchRequest }) => {
  console.log(fetchingMatchRequest)
  return (
    state.merge({ fetchingMatchRequest })
  )
}
export const pendingingmatchpeer = (state, { pendingMatchPeer }) => {
  console.log(pendingMatchPeer)
  return (
    state.merge({ pendingMatchPeer })
  )
}
export const connectionsucceed = (state, { connectionSucceed, approvedPeerName, approvedPeerId }) => {
  console.log(connectionSucceed)
  console.log(approvedPeerName)
  console.log(approvedPeerId)

  return (
    state.merge({ connectionSucceed, approvedPeerName, approvedPeerId, connectionDeleted: false })
  )
}
export const connectiondeleted = (state, { connectionDeleted }) => {
  console.log(connectionDeleted)
  return (
    state.merge({ connectionDeleted,
      username: null,
      invitation: null,
      invAccepted: false,
      friendname: null,
      fetchingMatchedPeer: false,
      pendingMatchPeer: false,
      mathcedPeerId: null,
      matchedPeerFailure: null,
      peerData: null,
      mathcedPeerId: null,
      connectionSucceed: false
   })
  )
}

export const lookuppeer = (state, { userId, username, friendname }) => state

export const currentdevicetoken = (state) => state

export const getcurrenttokensuccess = (state, { token }) => {
  console.log(token)
  return (
    state.merge({ token })
  )
}
export const matchedpeerfailure = (state, { matchedPeerFailure }) => {
  console.log(matchedPeerFailure)
  return (
    state.merge({ matchedPeerFailure })
  )
}
export const invitationsuccess = (state, { invitation }) => {
  console.log(invitation)
  return (
    state.merge({ invitation })
  )
}
export const getpeerdata = (state, { peerData, mathcedPeerId }) => {
  console.log(`${peerData} / ${mathcedPeerId}` )
  return (
    state.merge({ peerData, fetchingMatchedPeer: false, mathcedPeerId  })
  )
}
export const fetchingpeernamelookup = (state, { peerNameFetching, peerNameFoundError }) => {
  console.log(`${peerNameFetching} / ${peerNameFoundError}` )
  return (
    state.merge({ peerNameFetching, peerNameFoundError  })
  )
}
export const waitingapproval = (state, { approvedUsername }) => {
  console.log(approvedUsername)
  return (
    state.merge({ approvedUsername })
  )
} 
export const fetchchatid = (state, { chatId }) => {
  console.log(chatId)
  return (
    state.merge({ chatId })
  )
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DECLINE_INV]: invdecline,
  [Types.ACCEPT_INV]: invaccept,
  [Types.GET_CURRENT_TOKEN_SUCCESS]: getcurrenttokensuccess,
  [Types.INVITATION_SUCCESSED]: invitationsuccess,
  [Types.LOOKUP_PEER]: lookuppeer,
  [Types.MATCHED_PEER_FAILURE]: matchedpeerfailure,
  [Types.GET_PEER_DATA]: getpeerdata, 
  [Types.FETCHING_MATCHED_PEER]: fetchingmatchedpeer,
  [Types.FETCHING_MATCH_REQUEST]: fetchingmatchrequest,
  [Types.PENDING_MATCH_PEER]: pendingingmatchpeer,
  [Types.CONNECTION_DELETED]: connectiondeleted, 
  [Types.CONNECTION_SUCCEED]: connectionsucceed, 
  [Types.FETCHING_PEER_NAME_LOOKUP]: fetchingpeernamelookup, 
  [Types.WAITING_APPROVAL]: waitingapproval,
  [Types.GET_CURRENT_TOKEN]: currentdevicetoken,
  [Types.SAVE_DEVICE_TOKEN]: savedevicetoken,
  [Types.FETCH_CHAT_ID]: fetchchatid
})
