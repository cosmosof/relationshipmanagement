import { combineReducers } from 'redux'
import { resettableReducer } from 'reduxsauce'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

// listen for the action type of 'RESET', you can change this.
const resettable = resettableReducer('LOGOUT')

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    navigation: require('./NavigationRedux').reducer,
    appState: require('./AppStateRedux').reducer,
    github: require('./GithubRedux').reducer,
    login: require('./LoginRedux').reducer,
    signup: require('./SignupRedux').reducer,
    search: require('./SearchRedux').reducer,
    questions: resettable(require('./questionsRedux').reducer),
    homescreen: resettable(require('./HomeScreenRedux').reducer),
    matchscreen: resettable(require('./MatchScreenRedux').reducer)

  })

  return configureStore(rootReducer, rootSaga)
}
