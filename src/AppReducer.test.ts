import {
  AlertType,
  AppInitialStateType,
  appReducer,
  isDisabledButtonType,
  setAppAlertAC,
  setIsDisabledButtonAC
} from "./appReducer";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = {
    alert: {} as AlertType,
    isDisabledButton: {} as isDisabledButtonType,
    isOpenModal: 'close',
    preloader: false
  }
})
test('property alert should be changed' , () => {

  const endState = appReducer(startState, setAppAlertAC({message:'hi', type:'success'}))

  expect(endState.alert.message).toBe('hi');
  expect(endState.alert.type).toBe('success');
});
test('property isDisabledButton should be changed' , () => {

  const endState = appReducer(startState, setIsDisabledButtonAC({my:true, all: false}))

  expect(endState.isDisabledButton.my).toBeTruthy();
  expect(endState.isDisabledButton.all).toBeFalsy();
});