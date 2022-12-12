import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {registerReducer, RegisterReducerActionsType} from "../features/Register/registerReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {loginReducer, LoginReducerActionsType} from "../features/Login/loginReducer";
import {appReducer, AppReducerActionsType} from "../appReducer";
import {packsReducer, PacksReducerActionsType} from "../features/PacksList/packsReducer";
import {cardsReducer, CardsReducerActionsType} from "../features/CardsList/cardsReducer";

//STORE
const rootReducer = combineReducers({
   register: registerReducer,
   login: loginReducer,
   app: appReducer,
   packs: packsReducer,
   cards: cardsReducer,
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

  // TYPES
export type RootState = ReturnType<typeof store.getState>
type AppActionsType =
  | RegisterReducerActionsType
  | LoginReducerActionsType
  | AppReducerActionsType
  | PacksReducerActionsType
  | CardsReducerActionsType

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType> // диспатч для работы с экшенами и санками в рамкахх моего приложения
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActionsType
  > // (типизация для санки) то что наша санка возвращает

// HOOKS
export const useAppDispatch = () => useDispatch<AppDispatch>() //диспатч для нашего приложения
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // знает тип нашего store

// @ts-ignore
window.state = store.getState()
