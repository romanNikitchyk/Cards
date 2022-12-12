import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {getPacksTC, setPacksAC} from '../../packsReducer';
import {setIsDisabledButtonAC} from '../../../../appReducer';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';

export const MyAllFilter = () => {
  const dispatch = useAppDispatch()
  const user_id = useAppSelector(state => state.login._id)
  const isDisabled = useAppSelector(state => state.app.isDisabledButton)

  const onClickHandlerMy = () => {
  dispatch(setIsDisabledButtonAC({my:true, all:false}))
    dispatch(setPacksAC({user_id}))
    dispatch(getPacksTC())

  }

  const onClickHandlerAll = () => {
    dispatch(setPacksAC({user_id: ''}))
    dispatch(getPacksTC())
    dispatch(setIsDisabledButtonAC({my:false, all:true}))
  }

  return (
    <div style={{width: 196, height: 36}}>
      <CustomButton disabled={isDisabled.my} onClick={onClickHandlerMy} variant="contained" buttonText={'My'}/>
      <CustomButton disabled={isDisabled.all} onClick={onClickHandlerAll} variant="contained" buttonText={'All'}/>
    </div>
  );
};
