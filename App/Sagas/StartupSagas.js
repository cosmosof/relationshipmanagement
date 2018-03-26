/* import { put, select } from 'redux-saga/effects'
import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
import { is } from 'ramda'

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log('Hello, I\'m an example of how to log via Reactotron.')

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar
    })

    // fully customized!
    const subObject = { a: 1, b: [1, 2, 3], c: true }
    subObject.circularDependency = subObject // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar
      }
    })
  }
  const avatar = yield select(selectAvatar)
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'))
  }
}
 */

import { put, select } from 'redux-saga/effects'
import GithubActions from '../Redux/GithubRedux'
import AppStateActions from '../Redux/AppStateRedux'
import { is } from 'ramda'
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux'

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
  //console.warn(`isLoggedIn : ${isLoggedIn}`)
  if (isLoggedIn) {
    const userId = yield select(selectgetUserId)
    const email = yield select(selectgetEmail)
    const username = yield select(selectgetUsername)
    yield put(LoginActions.autoLogin(userId))
    yield put(LoginActions.loginSuccess(email, userId, username))
  }
}
