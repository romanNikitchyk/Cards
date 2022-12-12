import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../app/store';
import {getPacksTC, setPacksAC} from '../../packsReducer';
import {setIsDisabledButtonAC} from '../../../../appReducer';
import {CustomButton} from '../../../../components/CustomButton/CustomButton';

export const ResetFilters = (props:any) => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

  const onClickResetHandler = () => {
    dispatch(setIsDisabledButtonAC({my: false, all: false}))
    dispatch(setPacksAC({
      page: 1,
      pageCount: 5,
      packName: '',
      user_id: '',
      min: 0,
      max: maxCardsCount
    }))
    dispatch(getPacksTC())
  }
  return (
    <div>
      <CustomButton onClick={onClickResetHandler} variant={'contained'} buttonText={'Reset'}/>
    </div>
  );
};
