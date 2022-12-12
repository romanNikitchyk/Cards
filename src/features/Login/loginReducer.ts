import {changeUserDataType, LoginResponseType, profileAPI, regLogAuthAPI} from "../../api/api";
import {AppThunk} from '../../app/store';
import {LoginFormDataType} from './Login';
import {setAppAlertAC} from '../../appReducer';

const loginInitialState = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  rememberMe: false,
  isInitialized: false,
  isLoggedIn: false,
}

export const loginReducer = (state: LoginInitStateType = loginInitialState, action: LoginReducerActionsType): LoginInitStateType => {
  switch (action.type) {
    case'LOGIN/SIGN-UP':
      return {...state, ...action.profileData, isLoggedIn: action.isLoggedIn}
    case 'LOGIN/SET-NEW-USER-DATA':
      return {...state, ...action.newUser}
    case'LOGIN/SIGN-OUT':
      return {
        ...state,
        _id: '',
        email: '',
        name: '',
        avatar: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        isLoggedIn: false
      }
    case'LOGIN/AUTH-ME':
      return {...state, isInitialized: action.initializator}
    default:
      return state
  }
}

//ACTIONS
export const loginAC = (profileData: LoginResponseType, isLoggedIn: boolean) => {
  return {type: 'LOGIN/SIGN-UP', profileData, isLoggedIn} as const
}
export const logOutAC = () => {
  return {type: 'LOGIN/SIGN-OUT'} as const
}
export const changeUserDataAC = (newUser: LoginResponseType) => {
  return {type: 'LOGIN/SET-NEW-USER-DATA', newUser} as const
}
export const authMeAC = (initializator: boolean) => {
  return {type: 'LOGIN/AUTH-ME', initializator} as const
}

//THUNKS
export const loginTC = (loginData: LoginFormDataType): AppThunk => {
  return (dispatch) => {
    dispatch(authMeAC(false))
    regLogAuthAPI.login(loginData)
      .then((res) => {
        dispatch(loginAC(res.data, true))
        dispatch(authMeAC(true))
        console.log('res', res)
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : (e.message + ', more details in the console')
        dispatch(setAppAlertAC({message: error, type: 'error'}))
        dispatch(authMeAC(true))
      })
  }
}

export const logOutTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(authMeAC(false))
    regLogAuthAPI.logout()
      .then((res) => {
        dispatch(logOutAC())
        dispatch(authMeAC(true))
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : (e.message + ', more details in the console')
        dispatch(setAppAlertAC({message: error, type: 'error'}))
        dispatch(authMeAC(true))
      })
  }
}

export const authMeTC = (): AppThunk => {
  return (dispatch, getState) => {
    regLogAuthAPI.authMe()
      .then((res) => {
        dispatch(loginAC(res.data, true))
      })
      .catch((er) => {
        dispatch(logOutAC())
      })
      .finally(() => {
        dispatch(authMeAC(true))
      })
  }
}

export const changeUserDataTC = (newUserData: changeUserDataType): AppThunk => {
  return (dispatch) => {
    dispatch(authMeAC(false))
    profileAPI.changeUserName(newUserData)
      .then((res) => {
        console.log(res.data.updatedUser)
        dispatch(changeUserDataAC(res.data.updatedUser))
        dispatch(authMeAC(true))
      })
      .catch((e) => {
        const error = e.response
          ? e.response.data.error
          : (e.message + ', more details in the console')
        dispatch(setAppAlertAC({message: error, type: 'error'}))
      })
  }
}


//TYPES
export type LoginInitStateType = typeof loginInitialState

export type LoginReducerActionsType = LoginACType | ChangeUserDataACType | LogOutACType | AuthMeACType

export type LoginACType = ReturnType<typeof loginAC>
export type LogOutACType = ReturnType<typeof logOutAC>
export type ChangeUserDataACType = ReturnType<typeof changeUserDataAC>
export type AuthMeACType = ReturnType<typeof authMeAC>



