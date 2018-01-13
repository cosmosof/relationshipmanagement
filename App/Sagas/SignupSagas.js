import { put, call } from 'redux-saga/effects'
import SignupActions from '../Redux/SignupRedux'
import firebase from 'firebase'

// attempts to Signup
export function * signup ({ email, password }) {
  
  const firebaseAuth = ({ email, password }) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => ({ response }))
    .catch(error => ({ error }))

  const firebaseSendConfimationEmail = ({ user }) => {
    user.sendEmailVerification().then(function() {
      console.log('email sent')
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
  }

  if (password === '') {
    yield put(SignupActions.signupFailure('password can not be empty!'))
  } else {
    try {
      const { response, error } = yield call(firebaseAuth, { email, password })
      if (response) {
        const user = firebase.auth().currentUser;
        const { response, error } = yield call(firebaseSendConfimationEmail, { user })
        yield put(LoginActions.signupSuccess(email))
      } else { 
        yield put(SignupActions.signupFailure(`${error.message}`))
      }
    } catch (e) {
      yield put(SignupActions.signupFailure(`'${e.message}'`))
    }
  }
}

