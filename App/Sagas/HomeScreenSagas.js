import AsyncStorage from 'react-native';
import React from 'react';
import { put, call, take, select } from 'redux-saga/effects';
import { eventChannel, buffers, delay } from 'redux-saga';
import HomeScreenActions from '../Redux/HomeScreenRedux';
import firebase from 'react-native-firebase';
import LoginActions from '../Redux/LoginRedux';

export const selectgetUserId = state => state.login.userId;
export const selectgetUsername = state => state.login.username;
export const selectgetFriendname = state => state.homescreen.invitation;
export const selectgetFriendnameFromApprovedPeerName = state =>
  state.homescreen.approvedPeerName;
export const selectgetFriendFromApprovedPeerId = state =>
  state.homescreen.approvedPeerId;

//********************  TOKEN RELATED SAGAS ********************//

export function* getCurrentToken() {
  console.log('getCurrentToken saga');

  FCM = firebase.messaging();

  FCM.requestPermissions()
    .then(function() {
      console.log('Notification permission granted.');
    })
    .catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });

  FCM.onTokenRefresh(token => {
    console.log('onTokenRefresh');
    console.log(token);
  });

  const currentToken = () =>
    FCM.getToken()
      .then(function(token) {
        console.log(token);
        return token;
      })
      .then(token => ({ token }));

  try {
    const { token } = yield call(currentToken);
    if (token) {
      yield put(HomeScreenActions.getCurrentTokenSuccess(token));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* savetokentodb({ token, userId }) {
  console.log('savetokentodb');
  console.log(token);
  console.log(userId);

  firebase
    .database()
    .ref('users/' + userId + '/notificationTokens/')
    .set(token);
}

//********************  PEER MATCH RELATED SAGAS ********************//

export function* listenMatchrequestOnlogin() {
  console.log('listenMatchrequestOnlogin saga');
  yield put(HomeScreenActions.fetchingMatchedPeer(true));
  function createChannel(userId) {
    const ref = firebase.database().ref(`/matchrequest/${userId}/`);
    const channel = eventChannel(emit => {
      ref.on('value', snapshot => {
        snapshot.val() ? emit(snapshot) : emit({ false: 'false' });
      });
      return () => ref.off();
    }, buffers.expanding());
    return channel;
  }
  const userId = yield select(selectgetUserId);
  console.log('LOGIN_SUCCESS');
  const channel = createChannel(userId);
  while (true) {
    const item = yield take(channel);

    if (Object.keys(item)[0] === 'false') {
      console.log('empty invitation request');
      yield call(delay, 1000);
      yield put(HomeScreenActions.connectionDeleted(true));
      yield put(HomeScreenActions.fetchingMatchedPeer(false));
    } else {
      console.log('match request item exist');
      console.log(item);
      console.log(Object.keys(item));
      console.log(Object.values(item));
      console.log(Object.values(item)[2]);
      
      if (Object.values(item)[2]['requester']) {
        yield put(HomeScreenActions.fetchingMatchedPeer(false));
        yield put(HomeScreenActions.fetchingMatchRequest(true));

        console.log(Object.values(item)[2]['requester']);
        const requesterUserId = Object.keys(
          Object.values(item)[2]['requester']
        )[0];
        const requesterUsername = Object.values(item)[2]['requester'][
          `${requesterUserId}`
        ];
        console.log(`requesterUserId: ${requesterUserId}`);
        console.log(`requesterUsername: ${requesterUsername}`);
        yield put(
          HomeScreenActions.invitationSuccessed(
            Object.values(item)[2]['requester']
          )
        );
        yield call(delay, 1000);
        yield put(HomeScreenActions.fetchingMatchRequest(false));
      }
      if (Object.values(item)[2]['chatid']) {
        console.log('chatid');
        console.log(Object.values(item)[2]['chatid']);
        const chatId = Object.values(item)[2]['chatid']
        yield put(HomeScreenActions.fetchChatId(chatId));
      }
      if (Object.values(item)[2]['approvedrequest']) {
        yield call(delay, 1000);
        yield put(HomeScreenActions.fetchingMatchedPeer(false));
        console.log(Object.values(item)[2]['approvedrequest']);
        const approvedUserId = Object.keys(
          Object.values(item)[2]['approvedrequest']
        )[0];
        const approvedUsername = Object.values(item)[2]['approvedrequest'][
          `${approvedUserId}`
        ];
        console.log(`approvedUserId: ${approvedUserId}`);
        console.log(`approvedUsername: ${approvedUsername}`);
        yield put(HomeScreenActions.pendingMatchPeer(false));
        yield put(
          HomeScreenActions.connectionSucceed(
            true,
            approvedUsername,
            approvedUserId
          )
        );
      }
      if (Object.values(item)[2]['pendingrequest']) {
        yield put(HomeScreenActions.fetchingMatchedPeer(false));

        console.log(Object.values(item)[2]['pendingrequest']);
        const pendingUserId = Object.keys(
          Object.values(item)[2]['pendingrequest']
        )[0];
        const pendingUsername = Object.values(item)[2]['pendingrequest'][
          `${pendingUserId}`
        ];
        console.log(`approvedUserId: ${pendingUserId}`);
        console.log(`approvedUsername: ${pendingUsername}`);
        yield put(HomeScreenActions.waitingApproval(pendingUsername));

        yield put(HomeScreenActions.pendingMatchPeer(true));
      }
    }
  }
}

export function* findpeer({ userId, username, friendname }) {
  console.log('findpeer saga');
  console.log(`${userId}/ ${username} / ${friendname}`);
  yield put(HomeScreenActions.fetchingPeerNameLookup(true, ''));
  yield call(delay, 1000);
  
  if (friendname) {
    if (friendname !== username) {
      const firebaseGetfriendId = ({ friendname }) =>
        firebase
          .database()
          .ref('/usernames/' + `${friendname}`)
          .once('value')
          .then(response => ({ response }))
          .catch(error => ({ error }));

      const { response, error } = yield call(firebaseGetfriendId, {
        friendname
      });
      console.log(response);
      console.log(response.val());

      if (response.val()) {
        yield put(HomeScreenActions.fetchingPeerNameLookup(false, ''));

        var friendId = response.val();

        console.log(friendId);
        console.log(userId);

        firebase
          .database()
          .ref('/matchrequest/' + `${friendId}/` + 'requester/' + `${userId}`)
          .set(username);
        firebase
          .database()
          .ref(
            '/matchrequest/' + `${userId}/` + 'pendingrequest/' + `${friendId}`
          )
          .set(friendname);
        yield put(HomeScreenActions.pendingMatchPeer(true));
      } else {
        if (response.val() === null) {
          yield put(
            HomeScreenActions.fetchingPeerNameLookup(
              false,
              'Username can not be found'
            )
          );
        }
      }
    } else {
      yield put(
        HomeScreenActions.fetchingPeerNameLookup(
          false,
          'Username is your current username'
        )
      );
    }
  } else {
    yield put(
      HomeScreenActions.fetchingPeerNameLookup(
        false,
        'Username can not be empty'
      )
    );
  }
}

export function* acceptinv() {
  console.log('acceptinv saga');
  const userId = yield select(selectgetUserId);
  const username = yield select(selectgetUsername);
  const invitationObject = yield select(selectgetFriendname);
  const friendname = Object.values(invitationObject)[0];
  const friendId = Object.keys(invitationObject)[0];

  console.log(`${userId} / ${username} / ${friendname} / ${friendId}`);

  firebase
    .database()
    .ref('/matchrequest/' + `${friendId}/` + 'approvedrequest/' + `${userId}`)
    .set(username);
  firebase
    .database()
    .ref('/matchrequest/' + `${userId}/` + 'approvedrequest/' + `${friendId}`)
    .set(friendname);
  firebase
    .database()
    .ref('/matchrequest/' + `${friendId}/` + 'chatid/')
    .set(friendId+userId);
  firebase
    .database()
    .ref('/matchrequest/' + `${userId}/` + 'chatid/')
    .set(friendId+userId);
  firebase
    .database()
    .ref('/matchrequest/' + `${friendId}/` + 'pendingrequest/')
    .child(userId)
    .remove();
  firebase
    .database()
    .ref('/matchrequest/' + `${userId}/` + 'requester/')
    .child(friendId)
    .remove();
}

export function* declineinv() {
  console.log('declineinv saga');
  const userId = yield select(selectgetUserId);
  const username = yield select(selectgetUsername);
  const invitationObject = yield select(selectgetFriendname);
  const friendnameFromApprovedPeerName = yield select(
    selectgetFriendnameFromApprovedPeerName
  );
  const friendnameFromApprovedPeerId = yield select(
    selectgetFriendFromApprovedPeerId
  );
  console.log(friendnameFromApprovedPeerName);
  console.log(friendnameFromApprovedPeerId);
  console.log(invitationObject);

  const friendname = invitationObject
    ? Object.values(invitationObject)[0]
    : friendnameFromApprovedPeerName;
  const friendId = invitationObject
    ? Object.keys(invitationObject)[0]
    : friendnameFromApprovedPeerId;

  console.log(`${userId} / ${username} / ${friendname} / ${friendId}`);
  firebase
    .database()
    .ref('/matchrequest/' + `${friendId}/` + 'approvedrequest/')
    .child(userId)
    .remove();
  firebase
    .database()
    .ref('/matchrequest/' + `${userId}/` + 'approvedrequest/')
    .child(friendId)
    .remove();
  firebase
    .database()
    .ref('/matchrequest/' + `${userId}/` + 'requester/')
    .child(friendId)
    .remove();
  firebase
    .database()
    .ref('/matchrequest/' + `${friendId}/` + 'requester/')
    .child(userId)
    .remove();
  firebase
    .database()
    .ref('/matchrequest/' + `${friendId}/` + 'pendingrequest/')
    .child(userId)
    .remove();
  firebase
    .database()
    .ref('/matchrequest/' + `${userId}/` + 'pendingrequest/')
    .child(friendId)
    .remove();
  yield put(HomeScreenActions.connectionDeleted(true));
}
