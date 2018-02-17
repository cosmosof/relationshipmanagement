import { put, call } from 'redux-saga/effects'
import SignupActions from '../Redux/SignupRedux'
import firebase from 'react-native-firebase'

// attempts to Signup
export function * signup ({ email, password }) {
  
  const firebaseAuth = ({ email, password }) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(User => ({ User }))
    .catch(error => ({ error }))

  const firebaseSendConfimationEmail = ({ User }) => {
    User.sendEmailVerification().then(function() {
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
      const { User, error } = yield call(firebaseAuth, { email, password })
      if (User) {
        console.log(User)
        yield call(firebaseSendConfimationEmail, { User })
        yield put(SignupActions.signupSuccess(email))
      } else { 
        console.log(error)
        yield put(SignupActions.signupFailure(`${error.message}`))
      }
    } catch (e) {
      console.log(e)
      yield put(SignupActions.signupFailure(`'${e.message}'`))
    }
  }
}



export function * saveusername ({ username }) { 
  console.log('saving username saga')

  const user = firebase.auth().currentUser
  console.log(user)
  const userid = user.uid
  console.log(userid)

  const firebaseSaveUsername = ({ username, userid }) =>
    firebase.database().ref(`/users/${userid}/username/`)
      .set(username)
      .then(response => { console.log(response)
        return ({ response })
      })
      .catch(error => {
        console.log(error) 
        return ({ error })
      })
  
  const firebaseSaveUsernametoIndex = ({ username, userid }) => {
    console.log('firebaseSaveUsernametoIndex')
    return (
      firebase.database().ref('usernames/' + username)
      .set(userid)
      .then(response1 => { console.log(response1)
        return ({ response1 })
      })
      .catch(error1 => {
        console.log(error1) 
        return ({ error1 })
      })
    )
  }
 


  if (username === '') {
    yield put(SignupActions.saveUsernameFailure('username can not be empty!'))
  } else {
    user.updateProfile({
      displayName: username,
    }).then(function() {
      // Update successful.
      console.log('username updated')
    }).catch(function(error) {
      // An error happened.
      console.log('username updated error')
    }); 
    try {
      const { response, error } = yield call(firebaseSaveUsername, { username, userid })
      console.log(response)

      if (!error) {
        console.log(response)
        console.log(error)
        console.log('response')
        const { response1, error1 } = yield call(firebaseSaveUsernametoIndex, { username, userid })
        console.log(response1)
        if (!error1){
          console.log(response1)
          console.log(error1)
          yield put(SignupActions.saveUsernameSuccess(username))
        } else {
          console.log(error1)
          yield put(SignupActions.saveUsernameFailure(`'${error.message}'`))
        }
      } else {
        console.log(error)
        yield put(SignupActions.saveUsernameFailure('Username taken'))
      }
    } catch (error) {
      yield put(SignupActions.saveUsernameFailure(`'${error.message}'`))
    }
  }


/*
  const firebaseSaveUsername = ({ username, user }) =>
    user.updateProfile({
      displayName: username
    }).then(function() {
      console.log('displayName updated')
    }).catch(function(error) {
      console.log(error)
    });

  if (username === '') {
    yield put(SignupActions.saveUsernameFailure('username can not be empty!'))
  } else {
    try {
      yield call(firebaseSaveUsername, { username, user })
      yield put(SignupActions.saveUsernameSuccess(username))
    } catch (e) {
      yield put(SignupActions.saveUsernameFailure(`'${e.message}'`))
    }
  } */
}
