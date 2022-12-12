import React, {FC, ReactElement} from 'react';
import {Modal} from '@material-ui/core';
import {useAppSelector} from '../../app/store';
import style from './CustomModalBase.module.css'

type CustomModalPropsType = {
  children:ReactElement
  title:string
  isCloseModal?:()=>void
}

export const CustomModalBase:FC<CustomModalPropsType> = (props:CustomModalPropsType) => {
  const isOpenModal = useAppSelector(state=> state.app.isOpenModal)

  return (
    <div>
      <Modal
        open={Boolean(isOpenModal)}
        onClose={props.isCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modalWindow}>
          <h1 style={{paddingLeft:'24px'}}>{props.title}</h1>
          <hr style={{width:'398px'}}/>
          {props.children}
        </div>
      </Modal>
    </div>
  );
}