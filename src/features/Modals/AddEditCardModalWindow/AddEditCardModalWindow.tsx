import React from 'react';
import {CustomModalBase} from "../../../components/CustomModalBase/CustomModalBase";
import style from './AddEditCardModalWindow.module.css';
import {TextField} from "@material-ui/core";
import {CustomButton} from "../../../components/CustomButton/CustomButton";
import {useAppDispatch} from "../../../app/store";
import {useForm} from "react-hook-form";
import {setIsOpenModalAC} from "../../../appReducer";

export type textFieldAddNewCardDataType = {
  question: string
  answer: string
}
type AddEditCardModalWindowPropsType = {
  defaultValue?: {question:string, answer:string}
  title: string
  onSubmit:(data:textFieldAddNewCardDataType)=>void
}

export const AddEditCardModalWindow = (props: AddEditCardModalWindowPropsType) => {
  const dispatch = useAppDispatch()

  const {register, handleSubmit, reset, formState:{errors}} = useForm<textFieldAddNewCardDataType>()
  const onSubmit = (data: textFieldAddNewCardDataType) => {
    props.onSubmit(data)
    reset()
    onCloseHandler()
  }
  const onCloseHandler = () => {
    dispatch(setIsOpenModalAC('close'))
  }

  return (
    <CustomModalBase title={props.title} isCloseModal={onCloseHandler} >
      <div className={style.wrap}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.TextField}>
            <TextField
              error={!!errors.question}
              label={errors.question && errors.question.message}
              defaultValue={props.defaultValue?.question}
              autoComplete={"off"}
              placeholder={'Question'}
              style={{width:'350px', marginTop:'5px'}}
              {...register('question', {required:'All fields are required', minLength:1} )}
            />
            <TextField
              error={!!errors.answer}
              label={errors.answer && errors.answer?.message}
              defaultValue={props.defaultValue?.answer}
              autoComplete={"off"}
              placeholder={'Answer'}
              style={{width:'350px', marginTop:'5px'}}
              {...register('answer', {required:'All fields are required', minLength:1})}
            />
          </div>
          <div className={style.buttons}>
            <CustomButton onClick={onCloseHandler} variant={'contained'} buttonText={'cancel'}/>
            <CustomButton variant="contained" color={'primary'} type={'submit'} buttonText={'save'}/>
          </div>
        </form>
      </div>
    </CustomModalBase>
  );
};

