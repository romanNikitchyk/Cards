import {registerAC, RegisterInitialStateType, registerReducer} from "./registerReducer";

let startState: RegisterInitialStateType;

beforeEach(() => {
  startState = {
    registered: false,
  }
})
test('property isInitialized should be changed' , () => {

  const endState = registerReducer(startState, registerAC(true))

  expect(endState.registered).toBeTruthy();
});