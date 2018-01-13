import { put, call, take, all, select } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga';
import MatchScreenActions from '../Redux/MatchScreenRedux'
import firebase from 'firebase'


function createChannel (partnerId) {
  const ref = firebase.database().ref(`/users/${partnerId}/answers/`)
  const channel = eventChannel(emit => {
      ref.on('value', snapshot => {
        snapshot.val() ? emit(snapshot.val()) : 'false'
      });
      return () => ref.off();
    })	
  return channel; 
};

export function * partneranswers (partnerId) {
  console.log('partneranswers')
  console.log(partnerId.partnerId)

  const channel = createChannel(partnerId.partnerId);
    while(true) {
      const item = yield take(channel);
      const answers =  JSON.stringify(item);
      if(item === 'false') {
        console.log('requestRevoke')
        //yield put(HomeScreenActions.requestRevoke()) 
      }
      console.log('requestexist')
      console.log(answers)
      yield put(MatchScreenActions.fetchSuccess(answers));
    }     
}
