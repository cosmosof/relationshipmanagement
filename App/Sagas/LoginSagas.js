import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import firebase from 'react-native-firebase'

// attempts to login
export function * login ({ email, password }) {
  console.log('logging in')
  const firebaseAuth = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(User => ({ User }))
    .catch(error => ({ error }))

  const firebaseGetUsername = ({ userId }) =>
      firebase
        .database()
        .ref(`/users/${userId}/username/`)
        .once('value')
        .then(response => ({ response }))
        .catch(error => ({ error }));

  if (password === '') {
    yield put(LoginActions.loginFailure('password can not be empty!'))
  } else {
    try {
      const { User, error } = yield call(firebaseAuth, { email, password })
      if (User){
        console.log(User)
        const userId = User.uid;
        console.log(userId)

        try {
          const { response, error } = yield call(firebaseGetUsername, { userId });
          
          console.log(response.val())
          const username = response.val()
          console.log(username)

          if(response.val()) {
            yield put(LoginActions.loginSuccess(email, userId, username)) 
            /* User.emailVerified ? yield put(LoginActions.loginSuccess(email, userId, username)) 
            : 
            yield put(LoginActions.loginFailure('A verification email sent to your Signup email address')) */
            console.log(User.emailVerified)
            User.emailVerified ? yield put(LoginActions.isEmailVerified(true)) : false
          } else {
            console.log(error)
          }   
        } catch (error) {
          console.log(error)
        } 
      } else {
        console.log(error)
        yield put(LoginActions.loginFailure('user can not be found!'))
      }
    } catch (e) {
      yield put(LoginActions.loginFailure('something went wrong, try again!'))
    }
  }
}

export function * logout () {
  console.log('logoutsaga')
  firebase.auth().signOut().then(function() {
    console.log('Signed Out');
  }, function(error) {
    console.error('Sign Out Error', error);
  });
}
