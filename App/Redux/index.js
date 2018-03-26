import { resettableReducer } from 'reduxsauce'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'

// listen for the action type of 'RESET', you can change this. // DELETE_SUCCESS
const resettable = resettableReducer('LOGOUT') 

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  appState: require('./AppStateRedux').reducer,
  github: require('./GithubRedux').reducer,
  login: resettable(require('./LoginRedux').reducer),
  signup: resettable(require('./SignupRedux').reducer),
  profile: resettable(require('./ProfileRedux').reducer),
  search: require('./SearchRedux').reducer,
  onboarding: require('./OnboardingRedux').reducer,
  questions: resettable(require('./questionsRedux').reducer),
  homescreen: resettable(require('./HomeScreenRedux').reducer),
  chatscreen: resettable(require('./ChatRedux').reducer),
  todoscreen: resettable(require('./ToDoRedux').reducer)
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
