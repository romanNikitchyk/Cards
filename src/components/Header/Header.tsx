import style from './Header.module.css'
import logo from '../../assets/images/logo.png'
import {Link, useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../app/store';
import React from 'react';
import {CustomButton} from '../CustomButton/CustomButton';

export const Header = () => {
  const navigate = useNavigate()
const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)
const userName = useAppSelector(state=>state.login.name)
  const userAvatar = useAppSelector((state) => state.login.avatar)

  const onSignInClickHandler = () => {
    navigate ('/login')
  }
  const onClickHandler = () => {
    navigate ('/profile')
  }
  return (
      <div className={style.headerBar}>
        <Link to={'/profile'} className={style.logoLink}>
        <img src={logo} alt={'logotype'}/>
        </Link>
        <div className={style.user}>
          {isLoggedIn ? (
            <>
              <span onClick={onClickHandler} className={style.name}>{userName}</span>
              <div className={style.wrapAvatar}>
                <img src={userAvatar} alt="avatar" />
              </div>
            </>
          ) : (
            <CustomButton buttonText={'Sign in'} onClick={onSignInClickHandler}/>
          )}
        </div>
      </div>

  )
}



