import {AddCardParamsType, cardsAPI, CardsParamType, CardType} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setPackIdAC} from "../PacksList/packsReducer";
import {setAppAlertAC, setPreloaderAC} from "../../appReducer";
import {textFieldAddNewCardDataType} from "../Modals/AddEditCardModalWindow/AddEditCardModalWindow";

const cardsInitialState = {
  cards: [] as CardType[],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  packCreated: "",
  packDeckCover: null,
  packName: "",
  packPrivate: false,
  packUpdated: "",
  packUserId: "",
  page: 1,
  pageCount: 110,
  token: "",
  tokenDeathTime: 0,

  cardQuestion: '',
  cardsPack_id: '',
  currentCardId: '',
  currentCardQuesAnsw: {question: '', answer: ''},
}

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsReducerActionsType): CardsInitialStateType => {
  switch (action.type) {
    case'CARDS/SET-CARDS':
      return {...state, ...action.cardsData}
    case'CARDS/SET-CARD-QUESTION':
      return {...state, cardQuestion: action.question}
    case'CARDS/SET-CURRENT-PACK-ID':
      return {...state, cardsPack_id: action.id}
    case 'CARDS/SET-CURRENT-CARD-ID':
      return {...state, currentCardId: action.id}
    case 'CARDS/SET-CURRENT-CARD-NAME':
      return {...state, currentCardQuesAnsw: action.data}
    default:
      return state
  }
}

//ACTIONS
export const setCardsAC = (cardsData: CardsParamType) => {
  return {type: 'CARDS/SET-CARDS', cardsData} as const
}
export const setCardAnswerAC = (question: string) => {
  return {type: 'CARDS/SET-CARD-QUESTION', question} as const
}
export const setCurenetPackIdAC = (id: string) => {
  return {type: 'CARDS/SET-CURRENT-PACK-ID', id} as const
}
export const setCurrenetCardIdIdAC = (id: string) => {
  return {type: 'CARDS/SET-CURRENT-CARD-ID', id} as const
}
export const setCurrenetCardNameAC = (data: currentCardQuesAnsw) => {
  return {type: 'CARDS/SET-CURRENT-CARD-NAME', data} as const
}
 export type currentCardQuesAnsw = {
  question: string
  answer: string
}

//THUNKS
export const getCardsTC = (id?: string): AppThunk => {
  return (dispatch, getState) => {
    let packId = getState().packs.currentPackId
    const {cardQuestion, pageCount} = getState().cards
    if (id) {
      packId = id
      dispatch(setPackIdAC(id))
    }
    dispatch(setPreloaderAC(true))
    cardsAPI.getCards({cardsPack_id: packId, cardQuestion, pageCount})
      .then((res) => {
        dispatch(setCardsAC(res.data))
        dispatch(setPreloaderAC(false))
      })
  }
}

export const addNewCardTC = (newCard: AddCardParamsType,): AppThunk => {
  return (dispatch, getState) => {
    const {cardsPack_id} = getState().cards
    cardsAPI.addCard({...newCard, cardsPack_id})
      .then((res) => {
        dispatch(getCardsTC())
        dispatch(setAppAlertAC({message: 'New card edded', type: 'success'}))
      })
      .catch((e) => {
        dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
      })
  }
}

export const editCardTC = (newData: textFieldAddNewCardDataType): AppThunk => {
  return (dispatch, getState) => {
    const _id = getState().cards.currentCardId
    cardsAPI.editCard({...newData, _id})
      .then((res) => {
        dispatch(getCardsTC())
        dispatch(setAppAlertAC({message: 'Card has been successfully renamed', type: 'success'}))
      })
      .catch((e) => {
        dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
      })
  }
}

export const deliteCardTC = (cardId: string): AppThunk => {
  return (dispatch, getState) => {
    cardsAPI.deliteCard(cardId)
      .then((res) => {
        dispatch(getCardsTC())
        console.log(res)
        dispatch(setAppAlertAC({
          message: `Card "${res.data.deletedCard.question}" has been successfully deleted`,
          type: 'success'
        }))
      })
      .catch((e) => {
        dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
      })
  }
}

export const setCardGradeTC = (grade: { grade: number, card_id: string }): AppThunk => {
  return (dispatch, getState) => {
    cardsAPI.changeCardGrade(grade)
      .then((res) => {

      })
      .catch((e) => {
        dispatch(setAppAlertAC({message: 'something goes wrong', type: 'error'}))
      })
  }
}

//TYPES
export type CardsInitialStateType = typeof cardsInitialState

export type CardsReducerActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCardAnswerAC>
  | ReturnType<typeof setCurenetPackIdAC>
  | ReturnType<typeof setCurrenetCardIdIdAC>
  | ReturnType<typeof setCurrenetCardNameAC>



