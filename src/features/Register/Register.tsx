import style from './Register.module.css'
import {useForm} from 'react-hook-form';
import {InputCustom} from '../../components/InputCustom/InputCustom';
import {TextField} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {Navigate} from 'react-router-dom'
import {registerAC, registerTC} from './registerReducer';
import {CustomButton} from '../../components/CustomButton/CustomButton';
import React from "react";

type FormDataType = {
  email: string
  password: string
  password2: string
}
export const Register = () => {
  const registered = useAppSelector((state) => state.register.registered)
  const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)
  const {register, formState: {errors, isValid}, handleSubmit, reset, watch} = useForm<FormDataType>({mode: 'onBlur'})
  const dispatch = useAppDispatch()
  const onSubmit = (data: FormDataType) => {
    dispatch(registerTC(data.email, data.password))
    reset()
  }
 if (registered) {
   dispatch(registerAC(false))
   return <Navigate to={'/login'}/>
 }
  if(isLoggedIn) {
    return <Navigate to={'/profile'}/>
  }
  return (
    <div className={style.container}>
      <div className={style.register}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={style.title}>Sign Up</h2>
          <div className={style.wrapInput}>
            <TextField

              label={errors.email?.message}
              autoComplete={"off"}
              {...register("email",
                {
                  required: "required field",
                  pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Invalid email"
                  }
                })} placeholder="Email"
            />
          </div>
          <div className={style.wrapInput}>
            <InputCustom
              label={errors.password?.message}
              settings={{
                ...register("password",
                  {
                    required: "min 8 symbols",
                    minLength: {
                      value: 8,
                      message: "min 8 symbols"
                    }
                  })
              }}

              placeholder="Password"/>
          </div>

          <div className={style.wrapInput}>
            <InputCustom
              label={errors.password2?.message}
              settings={{
                ...register("password2",
                  {
                    required: "min 8 symbols",
                    validate: (val: string) => {
                      if (watch('password') !== val) {
                        return "incorrect password";
                      }
                    }
                  })
              }}
              placeholder="Repeat password"/></div>
          <CustomButton buttonText={'Sign Up'} type={'submit'} size={'large'} variant={'contained'} disabled={!isValid}/>
          <p className={style.text}>Already have an account?</p>
          <div className={style.wrapRegister}>
            <NavLink to={'/login'}>Sign In</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}