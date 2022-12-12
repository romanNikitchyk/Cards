import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {RoutesPage} from "./app/Routes";
import {authMeTC} from "./features/Login/loginReducer";
import {useAppDispatch, useAppSelector} from "./app/store";
import {CircularProgress} from "@material-ui/core";
import {AlertSnackbar} from "./components/AlertSnackBar/AlertSnackbar";

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.login.isInitialized)
  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return <div style={{position: 'fixed', top: '50%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }
  return (
    <div className="App">
      <Header/>

      <AlertSnackbar/>
      < RoutesPage/>
    </div>
  );
}

export default App;
