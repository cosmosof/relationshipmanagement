import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import ProfileActions from '../Redux/ProfileRedux';
import firebase from 'react-native-firebase';
export const selectgetUserId = state => state.login.userId;

/************************** DELETE USER SAGA ******************************/

export function* deleteuser({ approvedPeerId }) {
  console.log('deleting user');
  yield call(delay, 1000);

  /*  yield put(ProfileActions.deleteUserMessage())
  yield call(delay, 4000);
  yield put(ProfileActions.deleteSuccess(true)) */
  const userId = yield select(selectgetUserId);
  const user = firebase.auth().currentUser;
  console.log(user);

  if(!user){
    console.log(user)
    yield put(ProfileActions.deleteFailure('Error! Please logout&login and try'));
  } else {
    if (user.displayName) {
      console.log(user.displayName);
      const username = user.displayName;
      firebase
        .database()
        .ref('/usernames/')
        .child(username)
        .remove();
      if (approvedPeerId) {
        firebase
          .database()
          .ref('/matchrequest/' + `${approvedPeerId}/` + 'approvedrequest/')
          .child(userId)
          .remove();
        firebase
          .database()
          .ref('/matchrequest/' + `${userId}/` + 'approvedrequest/')
          .child(approvedPeerId)
          .remove();
      }
    }
  
    const firebaseDeleteUser = () =>
      user
        .delete()
        .then(response => ({ response }))
        .catch(error => ({ error }));
  
    try {
      const { response, error } = yield call(firebaseDeleteUser);
      console.log(response);
      if (!error) {
        console.log('success');
        // dispatch sucess actions
        yield put(ProfileActions.deleteUserMessage());
        yield call(delay, 6000);
        yield put(ProfileActions.deleteSuccess(true));
        yield put(ProfileActions.clearProfile());
      } else {
        console.log(error);
        // recover deleted username
        firebase
          .database()
          .ref('usernames/' + username)
          .set(userId)
          .then(function() {
            console.log('username recovered');
          })
          .catch(function(error) {
            console.log(error);
          });
        // dispatch error action
        yield put(ProfileActions.deleteFailure('could not delete the user'));
      }
    } catch (error) {
      console.log(error);
      yield put(ProfileActions.deleteFailure('could not delete the user'));
    }
  }
}

/**************************  PASSWORD CHANGE SAGA ******************************/

export function* changepassword({ password }) {
  console.log(password);
  console.log('changepassword');

  yield call(delay, 1000);

  const firebaseUpdatePassword = () =>
    firebase
      .auth()
      .currentUser.updatePassword(password)
      .then(response => ({ response }))
      .catch(error => ({ error }));
  if (password) {
    try {
      const { response, error } = yield call(firebaseUpdatePassword);
      console.log(response);
      if (!error) {
        console.log('password updated');

        yield put(ProfileActions.passwordChangeSuccess(true));
        yield call(delay, 4000);
        yield put(ProfileActions.resetProfile());
      } else if (error) {
        console.log(error);
        yield put(
          ProfileActions.passwordChangeFailure(
            'Error! Please logout&login and try'
          )
        );
      }
    } catch (e) {
      console.log(e);
      yield put(
        ProfileActions.passwordChangeFailure(
          'Error! Please logout&login and try'
        )
      );
    }
  } else {
    yield put(
      ProfileActions.passwordChangeFailure('Password can not be empty')
    );
  }
}

/**************************  USERNAME CHANGE SAGA ******************************/

export function* changeusername({ newusername, userId, approvedPeerId }) {
  yield call(delay, 1000);
  console.log(newusername);
  console.log(approvedPeerId);
  console.log(userId);

  console.log('changeusername');
  // TO DO delete old username

  const firebaseUpdateUsername = () =>
    firebase
      .database()
      .ref(`/users/${userId}/username/`)
      .set(newusername)
      .then(response => ({ response }))
      .catch(error => ({ error }));

  if (newusername) {
    try {
      const { response, error } = yield call(firebaseUpdateUsername);
      console.log(response);
      if (!error) {
        console.log('username updated');

        yield put(ProfileActions.usernameChangeSuccess(true));
        if (approvedPeerId) {
          firebase
            .database()
            .ref(
              '/matchrequest/' +
                `${approvedPeerId}/` +
                'approvedrequest/' +
                `${userId}`
            )
            .set(newusername);
        }
        yield call(delay, 4000);
        yield put(ProfileActions.resetProfile());
      } else if (error) {
        console.log(error);
        yield put(ProfileActions.usernameChangeFailure('Username taken'));
      }
    } catch (e) {
      console.log(e);
      yield put(ProfileActions.usernameChangeFailure('Username taken'));
    }
  } else {
    yield put(
      ProfileActions.usernameChangeFailure('Username can not be empty')
    );
  }
}
