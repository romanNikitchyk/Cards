import React from 'react';
import {SearchFilter} from "./SearchFilter/SearchFilter";
import style from './SettingsBar.module.css'
import {MyAllFilter} from "./MyAllFilter/MyAllFilter";
import  {RangeSlider} from "./InputDoubleRangeFilter/InputDoubleRangeFilter";
import {ResetFilters} from "./ResetFilter/ResetFilters";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getPacksTC, setNamePacksAC} from "../packsReducer";

export const SettingsBar = () => {
  const packName = useAppSelector(state => state.packs.packName)
  const dispatch = useAppDispatch()
  const onEnterHandler = (value:string) => {
      dispatch(setNamePacksAC(value))
      dispatch(getPacksTC())
    }

  return (
    <div className={style.container}>
      <SearchFilter styled={{width: '413px'}} nameOfEntity={packName} onEnter={onEnterHandler}/>
      <MyAllFilter/>
      <RangeSlider/>
      <ResetFilters/>
    </div>
  );
};

