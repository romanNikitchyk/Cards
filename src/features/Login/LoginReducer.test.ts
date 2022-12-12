import {authMeAC, changeUserDataAC, loginAC, LoginInitStateType, loginReducer, logOutAC} from "./loginReducer";

let startState: LoginInitStateType;

beforeEach(() => {
  startState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,
    rememberMe: false,
    isInitialized: false,
    isLoggedIn: false,
  }
})

test('the state should be changed correctly', () => {
  let profileData = {
    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAA",
    created: "2022-08-24T15:20:30.921Z",
    email: "roma@mail.ru",
    isAdmin: false,
    name: "Roma",
    publicCardPacksCount: 1,
    rememberMe: true,
    updated: "2022-12-11T11:12:20.682Z",
    verified: false,
    _id: "630641be20ea7336b0ad495c",
  }

  const endState = loginReducer(startState, loginAC(profileData, true))

  expect(endState.isLoggedIn).toBeTruthy();
  expect(endState.isInitialized).toBeFalsy();
  expect(endState.rememberMe).toBeTruthy();
  expect(endState.publicCardPacksCount).toBe(1);
})

test('the state should be resetted' , () => {

  const endState = loginReducer(startState, logOutAC())

  expect(endState._id).toBe('');
  expect(endState.email).toBe('');
  expect(endState.rememberMe).toBeFalsy();
  expect(endState.isLoggedIn).toBeFalsy();
  expect(endState.publicCardPacksCount).toBe(0);
});

test('property NAME or AVATAR should be changed' , () => {
  const newUserData = {
    avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAA",
    created: "2022-08-24T15:20:30.921Z",
    email: "roma@mail.ru",
    isAdmin: false,
    name: "Elon",
    publicCardPacksCount: 1,
    rememberMe: true,
    updated: "2023-12-11T11:12:20.682Z",
    verified: false,
    _id: "630641be20ea7336b0ad495c",
  }

  const endState = loginReducer(startState, changeUserDataAC(newUserData))

  expect(endState.name).toBe('Elon');
  expect(endState.avatar.length > 1).toBe(true);
});

test('property isInitialized should be changed' , () => {

  const endState = loginReducer(startState, authMeAC(true))

  expect(endState.isInitialized).toBeTruthy();

});