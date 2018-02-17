import { put, select } from 'redux-saga/effects'
import GithubActions from '../Redux/GithubRedux'
import AppStateActions from '../Redux/AppStateRedux'
import { is } from 'ramda'
import LoggedInActions, { isLoggedIn } from '../Redux/LoginRedux'

// exported to make available for tests
export const selectAvatar = (state) => state.github.avatar
export const selectLoggedInStatus = (state) => isLoggedIn(state.login)
export const selectgetUserId = (state) => state.login.userId
export const selectgetUsername = (state) => state.login.username
export const selectgetEmail = (state) => state.login.email

// process STARTUP actions
export function * startup (action) {
  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }
  yield put(AppStateActions.setRehydrationComplete())
  const isLoggedIn = yield select(selectLoggedInStatus)
  if (isLoggedIn) {
    const userId = yield select(selectgetUserId)
    const email = yield select(selectgetEmail)
    const username = yield select(selectgetUsername)
    yield put(LoggedInActions.autoLogin(userId))
    yield put(LoggedInActions.loginSuccess(email, userId, username))
  }
}
