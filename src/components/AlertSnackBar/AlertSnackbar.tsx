import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setAppAlertAC} from "../../appReducer";


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function AlertSnackbar() {
  const alert = useAppSelector(state => state.app.alert);
  const dispatch = useAppDispatch()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    dispatch(setAppAlertAC({message:null, type:undefined}));
  }


  const isOpen = !!alert.type;

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.type}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
