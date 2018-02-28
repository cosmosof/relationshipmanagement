import { takeLatest, takeEvery, fork, all,  call } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import firebase from 'react-native-firebase'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { GithubTypes } from '../Redux/GithubRedux'
import { LoginTypes } from '../Redux/LoginRedux'
import { SignupTypes } from '../Redux/SignupRedux'
import { ProfileTypes } from '../Redux/ProfileRedux'
import { QuestionsTypes } from '../Redux/questionsRedux'
import { HomeScreenTypes } from '../Redux/HomeScreenRedux'
import { ChatTypes } from '../Redux/ChatRedux'


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { login, logout, resetpassword } from './LoginSagas'
import { signup, saveusername } from './SignupSagas'
import { deleteuser, changeusername, changepassword } from './ProfileSagas'
import { saveuseranswer, fetchuseranswers, fetchpartnersanswers } from './QuestionsSagas'
import { getUserAvatar } from './GithubSagas'
import {
  getCurrentToken, savetokentodb, updatedItemSaga, 
  findpeer, acceptinv, declineinv, listenMatchrequestOnlogin
} from './HomeScreenSagas'
import { saveusermessage, fetchusermessages } from './ChatSagas'


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
    takeLatest(LoginTypes.RESET_PASSWORD, resetpassword), 
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(SignupTypes.SIGNUP_REQUEST, signup),
    takeLatest(SignupTypes.SAVE_USERNAME, saveusername),
    takeLatest(ProfileTypes.DELETE_USER, deleteuser),
    takeLatest(ProfileTypes.CHANGE_USERNAME, changeusername),
    takeLatest(ProfileTypes.CHANGE_PASSWORD, changepassword),
    takeLatest(QuestionsTypes.SAVE_USERS_ANSWERS, saveuseranswer),
    takeLatest(QuestionsTypes.FETCH_USERS_ANSWERS, fetchuseranswers),
    //takeLatest(QuestionsTypes.FETCH_PARTNERS_ANSWERS, fetchpartnersanswers),
    takeLatest(HomeScreenTypes.GET_CURRENT_TOKEN, getCurrentToken),
    takeLatest(HomeScreenTypes.LOOKUP_PEER, findpeer),
    takeLatest(HomeScreenTypes.ACCEPT_INV, acceptinv),
    takeLatest(HomeScreenTypes.DECLINE_INV, declineinv),
    takeLatest(HomeScreenTypes.SAVE_DEVICE_TOKEN, savetokentodb),
    takeLatest(ChatTypes.SAVE_USER_MESSAGE, saveusermessage), 
    takeLatest(ChatTypes.FETCH_USER_MESSAGES, fetchusermessages), 

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),
    //fork(acceptInvActionListener),
    takeLatest(LoginTypes.LOGIN_SUCCESS, listenMatchrequestOnlogin),
    takeLatest(HomeScreenTypes.CONNECTION_SUCCEED, fetchpartnersanswers) 

  ])
}

