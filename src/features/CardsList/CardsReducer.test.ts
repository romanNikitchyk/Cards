import {
  CardsInitialStateType,
  cardsReducer,
  setCardAnswerAC,
  setCardsAC,
  setCurenetPackIdAC
} from "./cardsReducer";
import {CardType} from "../../api/api";

let startState: CardsInitialStateType;

beforeEach(() => {
  startState = {
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
    page: 0,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0,

    cardQuestion: '',
    cardsPack_id: '',
    currentCardId: '',
    currentCardQuesAnsw: {question: '', answer: ''},
  }
})

test('array of cards should be not empty, and others propertys should be changed correctly', () => {
  let data = {
    cards: [{
      answer: "2222",
      cardsPack_id: "6383aa38ef4c1e000461d311",
      comments: "",
      created: "2022-12-10T14:56:21.857Z",
      grade: 0,
      more_id: "632a280db5c5b600048df06f",
      question: "no question",
      rating: 0,
      shots: 0,
      type: "card",
      updated: "2022-12-10T14:56:21.857Z",
      user_id: "632a280db5c5b600048df06f",
      __v: 0,
      _id: "63949e15c2e81e000470f16c",
    },
      {
        answer: "333",
        cardsPack_id: "6383aa38ef4c1e000461d311",
        comments: "",
        created: "2022-12-07T16:25:34.354Z",
        grade: 0,
        more_id: "632a280db5c5b600048df06f",
        question: "222",
        rating: 0,
        shots: 0,
        type: "card",
        updated: "2022-12-08T10:22:42.280Z",
        user_id: "632a280db5c5b600048df06f",
        __v: 0,
        _id: "6390be7e8fe5250004af7a94"
      }],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packCreated: "",
    packDeckCover: null,
    packName: "",
    packPrivate: true,
    packUpdated: "",
    packUserId: "",
    page: 1,
    pageCount: 110,
    token: "",
    tokenDeathTime: 0,
  }

  const endState = cardsReducer(startState, setCardsAC(data))

  expect(endState.cards.length).toBe(2);
  expect(endState.cards[0].answer).toBe('2222');
  expect(endState.page).toBe(1);
  expect(endState.pageCount).toBe(110);
  expect(endState.packPrivate).toBeTruthy();

})
test('correct task should be deleted from correct array', () => {

  const endState = cardsReducer(startState, setCurenetPackIdAC("1984"))

  expect(endState.cardsPack_id).toBe("1984");

});
test('correct property should be changed', () => {

  const endState = cardsReducer(startState, setCardAnswerAC("answer"))

  expect(endState.cardQuestion).toBe("answer");
  expect(endState.pageCount).toBe(0);
});
