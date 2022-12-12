import style from './Login.module.css';
import {TextField} from '@material-ui/core';
import {InputCustom} from '../../components/InputCustom/InputCustom';
import {useForm} from 'react-hook-form';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {loginTC} from './loginReducer';
import {CustomButton} from '../../components/CustomButton/CustomButton';

export type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {
  const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)
  const dispatch = useAppDispatch()
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm<LoginFormDataType>({mode: 'onBlur'})

  const onSubmit = (data: LoginFormDataType) => {
    dispatch(loginTC(data))
    reset()
  }

  if(isLoggedIn) {
    return <Navigate to={'/profile'}/>
  }

  return (
    <div className={style.container}>
      <div className={style.register}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={style.title}>Sign In</h2>
          <div className={style.wrapInput}>
            <TextField
              label={errors.email?.message }
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
          <div className={style.checkbox}>
            <input type={"checkbox"} {...register('rememberMe', {required:false})}/>
            <p>Remember me</p>
          </div>
          <CustomButton type={'submit'} size={"large"} variant={'contained'} disabled={!isValid} buttonText={'Sign In'}/>
          <p className={style.text}>Don't have an account yet?</p>
          <div className={style.wrapRegister}>
            <NavLink to={'/register'}>Sign Up</NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}