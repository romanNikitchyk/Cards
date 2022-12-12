import React from 'react';
import style from './DeleteModalWindow.module.css';
import {CustomButton} from '../../../components/CustomButton/CustomButton';
import {CustomModalBase} from "../../../components/CustomModalBase/CustomModalBase";
import {setIsOpenModalAC} from "../../../appReducer";
import {useAppDispatch} from "../../../app/store";

type DeleteModalWindowPropsType = {
  onDelete?:()=>void
  title: string
  modalText?:string
}
export const DeleteModalWindow = (props:DeleteModalWindowPropsType) => {
  const dispatch = useAppDispatch()

  const onCloseHandler = () => {
    dispatch(setIsOpenModalAC('close'))
  }
  return (
    <CustomModalBase title={props.title} isCloseModal={onCloseHandler}>
      <div className={style.container}>
        <p>{props.modalText}</p>
        <div className={style.buttonsWrap}>
          <CustomButton onClick={onCloseHandler} variant={'contained'} buttonText={'Cancel'}/>
          <CustomButton onClick={props.onDelete} color={'secondary'} variant={'contained'} buttonText={'Delete'}/>
        </div>
      </div>
    </CustomModalBase>
  );
};

