import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import firebase from 'firebase'

// attempts to login
export function * login ({ email, password }) {
  console.log('loggeedin')
  
  const firebaseAuth = ({ email, password }) =>
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => ({ response }))
    .catch(error => ({ error }))

  if (password === '') {
    yield put(LoginActions.loginFailure('password can not be empty!'))
  } else {
    try {
      const { response, error } = yield call(firebaseAuth, { email, password })
      if (response){
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        user.emailVerified ? yield put(LoginActions.loginSuccess(email, userId)) 
        : 
        yield put(LoginActions.loginFailure('A verification email sent to your Signup email address'))
      } else {
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
