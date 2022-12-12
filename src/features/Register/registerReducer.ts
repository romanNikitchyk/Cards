import {regLogAuthAPI} from "../../api/api";
import {AppThunk} from "../../app/store";
import {setAppAlertAC} from "../../appReducer";


const initialState = {
  registered: false,
}

export const registerReducer = (state:RegisterInitialStateType = initialState, action:RegisterReducerActionsType):RegisterInitialStateType => {
  switch(action.type){
    case'REGISTER/SET-REGISTERED':
      return{...state, registered: action.registered}
    default:
      return state
  }
}
//ACTIONS

export const registerAC = (registered:boolean) =>{
  return {type:'REGISTER/SET-REGISTERED', registered} as const
}

//THUNKS
export const registerTC = (email:string, password:string):AppThunk => {
  return (dispatch)=>{
    regLogAuthAPI.register(email, password)
      .then((res)=>{
        dispatch(registerAC(true))
      })
      .catch((e)=>{
        const error = e.response
          ? e.response.data.error
          : (e.message + ', more details in the console')
        dispatch(setAppAlertAC(error))
      })
  }
}

//TYPES
export type RegisterInitialStateType = typeof initialState

export type RegisterReducerActionsType = ReturnType<typeof registerAC>


