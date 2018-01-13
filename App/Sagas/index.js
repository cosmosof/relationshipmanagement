import { takeLatest, fork, all,  call } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import firebase from 'firebase'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignupTypes } from '../Redux/SignupRedux'
import { QuestionsTypes } from '../Redux/questionsRedux'
import { HomeScreenTypes } from '../Redux/HomeScreenRedux'
import { MatchScreenTypes } from '../Redux/MatchScreenRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout } from './LoginSagas'
import { signup } from './SignupSagas'
import { answer, fetchanswers } from './QuestionsSagas'
import { getUserAvatar } from './GithubSagas'
import { savetoken, savetokentodb, updatedItemSagaFromScreen, updatedItemSaga } from './HomeScreenSagas'
import { partneranswers } from './MatchScreenSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()
firebase.initializeApp({
  apiKey: 'AIzaSyBDFHyMGuw3f1LNCkcSXWaO48tJQ2zqVHU',
  authDomain: 'enazuc-349e9.firebaseapp.com',
  databaseURL: 'https://enazuc-349e9.firebaseio.com',
  projectId: 'enazuc-349e9',
  storageBucket: '',
  messagingSenderId: '221830677316'
});
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(LoginTypes.LOGIN_REQUEST, login),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup),
    takeLatest(QuestionsTypes.SAVE_ANSWERS, answer),
    takeLatest(QuestionsTypes.FETCH_ANSWERS, fetchanswers),
    takeLatest(HomeScreenTypes.SAVE_TOKEN, savetoken),
    takeLatest(HomeScreenTypes.REQ_INV, updatedItemSagaFromScreen),
    takeLatest(HomeScreenTypes.SAVE_REQUEST, savetokentodb),
    takeLatest(MatchScreenTypes.GET_ANSWERS, partneranswers),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    //fork(updatedItemSaga)
  ])
}

