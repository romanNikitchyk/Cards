import axios from 'axios';
import {LoginFormDataType} from '../features/Login/Login';

export const instance = axios.create({
  // baseURL: 'http://localhost:7542/2.0/',
  // baseURL: 'https://neko-back.herokuapp.com/2.0',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0'
      : 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

// REG LOG AUTH TYPES
type RegistrationData = {
  email: string
  password: string
}
export type LoginResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
}

export const regLogAuthAPI = {
  register(email: string, password: string) {
    return instance.post<RegistrationData>('/auth/register', {email, password})
  },
  login(loginData: LoginFormDataType) {
    return instance.post<LoginResponseType>('/auth/login', {...loginData})
  },
  logout() {
    return instance.delete<LoginResponseType>('/auth/me')
  },
  authMe() {
    return instance.post<LoginResponseType>('/auth/me')
  }
}

// PROFILE TYPES
export type ResponseTypeUpdateUser = {
  updatedUser: LoginResponseType
  error?: string
}

export type changeUserDataType = {
  name?: string
  avatar?: string
}

export const profileAPI = {
  changeUserName(data: changeUserDataType) {
    return instance.put<ResponseTypeUpdateUser>('/auth/me', data)
  }
}

// PACKS TYPES
export type PacksParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  cardPacksTotalCount?: number
  minCardsCount?: number
  maxCardsCount?: number
}

export type PacksResponseType = {
  cardPacks: CardsPacksType[]
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
  name: string
}

export type CardsPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: false
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type CreateCardsPackType = {
  name?: string
  deckCover?: string
  private?: boolean
}

type CreateResponseType = {
  newCardsPack: NewCardsPack
  token: string
  tokenDeathTime: number
}

export type RenamePackType = {
  _id?: string
  name?: string
  private?: boolean
}

type EditResponseType = {
  newCardsPack: NewCardsPack
  token: string
  tokenDeathTime: number
}

type NewCardsPack = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: false
  rating: number
  shots: number
  type: string
  update: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}
type PacksDeleteResponseType = {
  deletedCardsPack: {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
  }


}

export const packsAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<PacksResponseType>('/cards/pack', {params})
  },
  createPack(cardsPack: CreateCardsPackType) {
    return instance.post<CreateResponseType>('/cards/pack', {cardsPack})
  },
  renamePack(cardsPack: RenamePackType) {
    return instance.put<EditResponseType>('/cards/pack', {cardsPack})
  },
  deletePack(param: string) {
    return instance.delete<PacksDeleteResponseType>(`/cards/pack?id=${param}`)
  }
}
//CARDS TYPES
export type CardType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}

export type CardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: string
  packDeckCover: string
  packName: string
  packPrivate: boolean
  packUpdated: string
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type CardsParamType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  max?: number
  min?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

export type AddCardParamsType = {
  cardsPack_id?: string
  question: string
  answer: string

}

export type EditCardParamType = {
  _id: string
  question: string
  answer: string
}
type CardsDeleteResponseType = {
  deletedCard: {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: number
  }
}

export const cardsAPI = {
  getCards(params: CardsParamType) {
    return instance.get<CardsResponseType>('/cards/card', {params})
  },
  addCard(card: AddCardParamsType) {
    return instance.post('/cards/card', {card})
  },
  editCard(card: EditCardParamType) {
    return instance.put('/cards/card', {card})
  },
  deliteCard(param: string) {
    return instance.delete<CardsDeleteResponseType>(`cards/card?id=${param}`)
  },
  changeCardGrade(grade: { grade: number, card_id: string }) {
    return instance.put('/cards/grade', grade)
  }
}
