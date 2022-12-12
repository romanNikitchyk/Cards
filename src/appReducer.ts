const initialState: AppInitialStateType = {
  alert: {} as AlertType,
  isDisabledButton: {} as isDisabledButtonType,
  isOpenModal: 'close',
  preloader: false
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppReducerActionsType): AppInitialStateType => {
  switch (action.type) {
    case 'APP/SET-ALERT':
      return {...state, alert: action.alert as AlertType}
    case 'APP/SET-DISABLED':
      return {...state, isDisabledButton: action.disabled}
    case 'APP/SET-IS-OPEN-MODAL':
      return {...state, isOpenModal: action.isOpen}
    case 'APP/SET-PRELOADER-MODE':
      return {...state, preloader: action.mode}
    default:
      return {...state}
  }
}


//ACTIONS
export const setAppAlertAC = (alert: AlertType) => ({type: 'APP/SET-ALERT', alert} as const)

export const setIsDisabledButtonAC = (disabled: isDisabledButtonType) => ({type: 'APP/SET-DISABLED', disabled} as const)

export const setIsOpenModalAC = (isOpen: IsOpenModalType) => ({type: 'APP/SET-IS-OPEN-MODAL', isOpen} as const)

export const setPreloaderAC = (mode: boolean) => ({type: 'APP/SET-PRELOADER-MODE', mode} as const)

//TYPES
export type SetAppAlertActionType = ReturnType<typeof setAppAlertAC>
export type SetIsDisabledButtonActionType = ReturnType<typeof setIsDisabledButtonAC>
export type SetIsOpenModalActionType = ReturnType<typeof setIsOpenModalAC>
export type SetPreloaderModeActionType = ReturnType<typeof setPreloaderAC>

export type AppReducerActionsType =
  | SetAppAlertActionType
  | SetIsDisabledButtonActionType
  | SetIsOpenModalActionType
  | SetPreloaderModeActionType

type IsOpenModalType = 'close' | 'addNewPack' | 'editPack' | 'deletePack' | 'addNewCard' | 'editCard' | 'deleteModal'
type ColorOfSnackBarType = 'success' | 'info' | 'warning' | 'error';
export type AlertType = { message: string | null, type: ColorOfSnackBarType | undefined }
export type isDisabledButtonType = {
  my: boolean, all: boolean
}

export type AppInitialStateType = {
  alert: AlertType
  isDisabledButton: isDisabledButtonType
  isOpenModal: IsOpenModalType
  preloader: boolean
}