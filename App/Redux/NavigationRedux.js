import { NavigationActions } from 'react-navigation'
import { PrimaryNav } from '../Navigation/AppNavigation'

const { navigate, reset } = NavigationActions
const { getStateForAction } = PrimaryNav.router

/* const ONBOARDING = getStateForAction(PrimaryNav.router.getActionForPathAndParams('OnboardingStack'))
const INITIAL_STATE = getStateForAction(navigate('LoadingScreen')) 
const NOT_LOGGED_IN_STATE = getStateForAction(PrimaryNav.router.getActionForPathAndParams('NotLoggedInStack'))
const LOGGED_IN_STATE = getStateForAction(PrimaryNav.router.getActionForPathAndParams('StacksInTabs'))
const DELETE_USER_CLEAR_PROFILE = getStateForAction(PrimaryNav.router.getActionForPathAndParams('NotLoggedInStack'))
const USERNAME_SUCCESS = getStateForAction(PrimaryNav.router.getActionForPathAndParams('NotLoggedInStack')) 
const ONBOARDING_SIGNIN = getStateForAction(PrimaryNav.router.getActionForPathAndParams('NotLoggedInStack')) */
const ONBOARDING = getStateForAction(NavigationActions.navigate({routeName: 'OnboardingStack'}))
const INITIAL_STATE = getStateForAction(navigate('LoadingScreen')) 
const NOT_LOGGED_IN_STATE = getStateForAction(NavigationActions.navigate({routeName: 'NotLoggedInStack'}))
const LOGGED_IN_STATE = getStateForAction(NavigationActions.navigate({routeName: 'StacksInTabs'}))
const DELETE_USER_CLEAR_PROFILE = getStateForAction(NavigationActions.navigate({routeName: 'NotLoggedInStack'}))
const USERNAME_SUCCESS = getStateForAction(NavigationActions.navigate({routeName: 'NotLoggedInStack'})) 
const ONBOARDING_SIGNIN = getStateForAction(NavigationActions.navigate({routeName: 'NotLoggedInStack'}))
/**
 * Creates an navigation action for dispatching to Redux.
 *
 * @param {string} routeName The name of the route to go to.
 */
// const navigateTo = routeName => () => navigate({ routeName })

export function reducer (state = INITIAL_STATE, action) {
  let nextState
  switch (action.type) {
   case 'SET_REHYDRATION_COMPLETE':
      return ONBOARDING
    case 'LOGOUT':
      return NOT_LOGGED_IN_STATE
    case 'LOGIN_SUCCESS':
      return LOGGED_IN_STATE
    case 'AUTO_LOGIN':
      return LOGGED_IN_STATE
    case 'CLEAR_PROFILE':
      return DELETE_USER_CLEAR_PROFILE
    case 'SAVE_USERNAME_SUCCESS':
      return USERNAME_SUCCESS 
    case 'ONBOARDINGTO_SIGNIN':
      return ONBOARDING_SIGNIN    
  }
  nextState = getStateForAction(action, state)
  return nextState || state
}