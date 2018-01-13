import { put, call, take, all, select } from 'redux-saga/effects'
import { eventChannel, buffers } from 'redux-saga';
import HomeScreenActions from '../Redux/HomeScreenRedux'
import firebase from 'firebase'
import firebaseRN from 'react-native-firebase';
import LoginActions from '../Redux/LoginRedux'

//export const selectgetUserId = (state) => state.login.userId
/*
function createChannel (userId) {
  const ref = firebase.database().ref(`/matchrequest/${userId}/`)
  const channel = eventChannel(emit => {
      ref.on('value', snapshot => {
        console.log(Object.keys(snapshot.val())[0])
        snapshot.val() ? emit(Object.keys(snapshot.val())[0]) : 'false'
      });
      return () => ref.off();
    })	
  return channel; 
};

export function * updatedItemSaga () {
  console.log('updatedItemSaga')
  //const action = yield take('AUTO_LOGIN')
  //console.log(action.userId)
  //const userId = action.userId
  const temp = yield take('LOGIN_SUCCESS')
  const userId = temp.userId;
    console.log(userId)
    //console.log(userId)
    
    const channel = createChannel(userId);
    while(true) {
      const item = yield take(channel);
      if(item === 'false') {
        yield put(HomeScreenActions.requestRevoke()) 
      }
      console.log(item)
      yield put(HomeScreenActions.invitationSuccessed(item));
    }       
} */

export function * savetoken () {
    FCM = firebaseRN.messaging();
    FCM.requestPermissions();
  
    const firebaseSaveToken = () => 
        FCM.getToken().then(function(token) {
          console.log(token); 
          return token;
        }).then(token => ({ token }))

        try {
          const { token } = yield call(firebaseSaveToken);
          if (token){
          yield put(HomeScreenActions.tokenSuccess(token)) 
          }
        } catch(e) {
          console.log(e)
        }
       // yield call(updatedItemSaga) // waits for the fetchPosts task to terminate

  }          

  export function * savetokentodb ({ username, token }) {
    firebase.database().ref('username/' + username + '/notificationTokens/').set(token);
    
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('username/' + username + '/Uid/').set(userId);
    firebase.database().ref('users/' + userId + '/notificationTokens/').set(token);
  }
 
 

  function createChannel (userId) {
    const ref = firebase.database().ref(`/matchrequest/${userId}/`)
    const channel = eventChannel(emit => {
        ref.on('value', snapshot => {
          console.log(Object.keys(snapshot.val())[0])
          snapshot.val() ? emit(Object.keys(snapshot.val())[0]) : 'false'
        });
        return () => ref.off();
      }, buffers.expanding())	
    return channel; 
  };
 
 
 

  export function * updatedItemSagaFromScreen ({userId}) {
   
    //const temp = yield take('LOGIN_SUCCESS')
    //const userId = temp.userId;
    //const temp = yield take(selectgetUserId)

      console.log(userId)
      //console.log(selectgetUserId)

      console.log('updatedItemSagaFromScreen1')
      console.log('updatedItemSagaFromScreen2')
      console.log('updatedItemSagaFromScreen3')

      const channel = createChannel(userId);
      while(true) {
        const item = yield take(channel);
        console.log(item)
        if(item === 'false') {
          console.log('requestRevoke')
          yield put(HomeScreenActions.requestRevoke()) 
        } else {
          console.log('requestexist')
          console.log(item)
          yield put(HomeScreenActions.invitationSuccessed(item));
        }
      }       
  } 