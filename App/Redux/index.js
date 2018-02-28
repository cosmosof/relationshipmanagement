import { combineReducers } from 'redux'
import { resettableReducer } from 'reduxsauce'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'


// listen for the action type of 'RESET', you can change this. // DELETE_SUCCESS
const resettable = resettableReducer('LOGOUT') 

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    navigation: require('./NavigationRedux').reducer,
    appState: require('./AppStateRedux').reducer,
    github: require('./GithubRedux').reducer,
    login: resettable(require('./LoginRedux').reducer),
    signup: resettable(require('./SignupRedux').reducer),
    profile: resettable(require('./ProfileRedux').reducer),
    search: require('./SearchRedux').reducer,
    questions: resettable(require('./questionsRedux').reducer),
    homescreen: resettable(require('./HomeScreenRedux').reducer),
    chatscreen: resettable(require('./ChatRedux').reducer),
  })

  return configureStore(rootReducer, rootSaga)
}
