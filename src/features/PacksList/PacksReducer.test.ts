import {CardsPacksType} from "../../api/api";
import {PacksInitialStateType, packsReducer, setNamePacksAC, setPacksAC} from "./packsReducer";

let startState: PacksInitialStateType;

beforeEach(() => {
  startState = {
    cardPacks: [] as CardsPacksType[],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
    packName: '',
    user_id: '',
    valueOfSearchInput: '',
    min: 0,
    max: 0,
    currentPackId: '',
    currentDeckName: '',
  }
})

test('array of cardsPacks should be not empty, and others propertys should be changed correctly', () => {
  let packsData = {
    cardPacks: [{
      cardsCount: 1,
      created: "2022-12-11T03:14:59.779Z",
      deckCover: "",
      grade: 0,
      more_id: "63953f30c2e81e000470f183",
      name: " Multiplication table",
      path: "/def",
      private: false,
      rating: 0,
      shots: 0,
      type: "pack",
      updated: "2022-12-11T03:15:15.280Z",
      user_id: "63953f30c2e81e000470f183",
      user_name: "Andrey",
      __v: 0,
      _id: "63954b33c2e81e000470f195",
    },],
    cardsTotalCount: 0,
    packUpdated: "",
    packUserId: "",
    page: 1,
    pageCount: 110,
    token: "",
    tokenDeathTime: 0,
  }

  const endState = packsReducer(startState, setPacksAC(packsData))

  expect(endState.cardPacks.length).toBe(1);
  expect(endState.pageCount).toBe(110);
})

test('correct pack should be deleted from correct array', () => {

  const endState = packsReducer(startState, setNamePacksAC("1984"))

  expect(endState.packName).toBe("1984");

});

