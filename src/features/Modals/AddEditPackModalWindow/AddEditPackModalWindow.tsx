import React from 'react';
import {useForm} from "react-hook-form";
import style from "./AddEditPackModatlWindow.module.css";
import {TextField} from "@material-ui/core";
import {setIsOpenModalAC} from "../../../appReducer";
import {useAppDispatch} from "../../../app/store";
import {CustomModalBase} from "../../../components/CustomModalBase/CustomModalBase";
import {CustomButton} from "../../../components/CustomButton/CustomButton";

export type textFieldEditPackDataType = {
  name: string
  private?: boolean
}

type AddEditPacksModalWindowPropsType = {
  defaultValue?: string // имя исходной колоды
  title: string // заголовок модального окна
  onSubmit: (data: textFieldEditPackDataType) => void  // санка отправляющая запрос на сервак
}

export const AddEditPacksModalWindow = (props: AddEditPacksModalWindowPropsType) => {
  const dispatch = useAppDispatch()

  const onCloseHandler = () => {
    dispatch(setIsOpenModalAC('close'))
  }

  const {register, handleSubmit, reset, formState: {errors}} = useForm<textFieldEditPackDataType>()

  const onSubmit = (data: textFieldEditPackDataType) => {
    props.onSubmit(data)
    reset()
    dispatch(setIsOpenModalAC('close'))
  }

  return (
    <CustomModalBase title={'Edit pack'} isCloseModal={onCloseHandler}>
      <div className={style.wrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.TextField}>
            <TextField
              error={!!errors.name}
              label={errors.name && errors.name?.message}
              defaultValue={props.defaultValue && props.defaultValue}
              autoComplete={"off"}
              placeholder={'Name pack'}
              style={{width: '350px'}}
              {...register('name', {required: 'Name is required', minLength: 1})}
            />
          </div>
          <div className={style.checkbox}>
            <input type={"checkbox"} {...register('private')}/>
            <p>Private pack</p>
          </div>
          <div className={style.buttons}>
            <CustomButton onClick={onCloseHandler} variant="contained" buttonText={'cancel'}/>
            <CustomButton variant="contained" color={'primary'} type={'submit'} buttonText={'save'}/>
          </div>
        </form>
      </div>
    </CustomModalBase>
  );
};

