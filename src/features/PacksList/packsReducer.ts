import {CardsPacksType, CreateCardsPackType, packsAPI, PacksParamsType, RenamePackType} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppAlertAC, setPreloaderAC} from "../../appReducer";

const packsInitialState = {
  cardPacks: [] as CardsPacksType[], // массив обьектов с данными колод
  cardPacksTotalCount: 0, // количество колод
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1, // Текущая страница
  pageCount: 5, // Колод на странице
  token: '',
  tokenDeathTime: 0,

  packName: '', // имя колоды для сортировки по имени
  user_id: '', // id пользователя
  valueOfSearchInput: '',
  min: 0,
  max: 0,
  currentPackId: '', // id of current pack
  currentDeckName: '', // name of current pack
}

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksReducerActionsType): PacksInitialStateType => {
  switch (action.type) {
    case'PACKS/SET-PACKS':
      return {...state, ...action.packsData}
    case 'PACKS/SET-PACKS-NAME':
      return {...state, packName: action.packName}
    case 'PACKS/SET-PACKS-ID':
      return {...state, currentPackId: action.currentPackId}
    case 'PACKS/SET-DECK-NAME':
      return {...state, currentDeckName: action.name}
    default:
      return state
  }
}

//ACTIONS
export const setPacksAC = (packsData: PacksParamsType) => {
  return {type: 'PACKS/SET-PACKS', packsData} as const
}
export const setNamePacksAC = (packName: string) => {
  return {type: 'PACKS/SET-PACKS-NAME', packName} as const
}

export const setPackIdAC = (currentPackId: string) => {
  return {type: 'PACKS/SET-PACKS-ID', currentPackId} as const
}
export const setDeckNameAC = (name: string) => {
  return {type: 'PACKS/SET-DECK-NAME', name} as const
}

//THUNKS
export const getPacksTC = (): AppThunk => {
  return (dispatch, getState) => {
    const {
      page,
      pageCount,
      packName,
      user_id,
      min,
      max
    } = getState().packs
    dispatch(setPreloaderAC(true))
    packsAPI.getPacks({packName, page, pageCount, user_id, min, max,})
      .then((res) => {
        dispatch(setPacksAC(res.data))
        dispatch(setPreloaderAC(false))
      })
  }
}

export const addNewPackTC = (data: CreateCardsPackType): AppThunk => {
  return (dispatch) => {
    packsAPI.createPack(data)
      .then((res) => {
          dispatch(getPacksTC())
          dispatch(setAppAlertAC({message:`New pack "${data.name}" added`, type:'success'}))
      })
      .catch((e) => {
          dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
        }
      )
  }
}

export const editPackTC = (data: RenamePackType): AppThunk => {
  return (dispatch) => {
    packsAPI.renamePack(data)
      .then((res) => {
        if (data.name === '') {
          dispatch(setAppAlertAC({message: 'Give the name to your pack', type: 'info'}))
        } else {
          dispatch(getPacksTC())
          dispatch(setAppAlertAC({message:'Pack has been successfully renamed',type:'success'}))
        }
      })
      .catch((e) => {
          dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
        }
      )
  }
}

export const deletePackTC = (data: string): AppThunk => {
  return (dispatch) => {
    packsAPI.deletePack(data)
      .then((res) => {
        dispatch(getPacksTC())
        dispatch(setAppAlertAC({message:`Pack "${res.data.deletedCardsPack.name}" has been successfully deleted`, type:'success'}))
      })
      .catch((e) => {
          dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
        }
      )
  }
}

export const setValueInputRangeTC = (min: number, max: number): AppThunk => {
  return dispatch => {
    dispatch(setPacksAC({min, max}))
    dispatch(getPacksTC())
  }
}

//TYPES
export type PacksInitialStateType = typeof packsInitialState

export type PacksReducerActionsType =
  ReturnType<typeof setPacksAC>
  | ReturnType<typeof setNamePacksAC>
  | ReturnType<typeof setPackIdAC>
  | ReturnType<typeof setDeckNameAC>


