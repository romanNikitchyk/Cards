import style from './Profile.module.css'
import {Button} from "@material-ui/core";
import {Link, Navigate} from "react-router-dom";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {changeUserDataTC, logOutTC} from "../Login/loginReducer";
import React, {ChangeEvent, useRef} from "react";
import {setAppAlertAC} from "../../appReducer";
import {CustomButton} from "../../components/CustomButton/CustomButton";

export const Profile = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(state=>state.login.name)
  const avatar = useAppSelector(state=>state.login.avatar)
  const userEmail = useAppSelector(state=>state.login.email)
  const isLoggedIn = useAppSelector(state=>state.login.isLoggedIn)

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click();
  };

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      console.log('file: ', file)

      if (file.size < 4000000) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const file64 = reader.result as string
          dispatch(changeUserDataTC({avatar:file64}))
        }
        reader.readAsDataURL(file)
      } else {
        dispatch(setAppAlertAC({message:'Файл слишком большого размера', type:'warning'}))
      }
    }
  }
  const changeTextHandler = (name: string) =>{
    dispatch(changeUserDataTC({name}))
  }
  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  if (!isLoggedIn ) {
    return <Navigate to={'/login'} />
  }

  return (<div className={style.container}>
   <Link className={style.link} to={'/packslist'}>
      Back to Packs List
    </Link>
    <div className={style.profile}>
      <h3 className={style.title}>Personal Information</h3>
      <div className={style.wrapAvatar}>
        <img src={avatar} alt="avatar" />
          <button
            onClick={selectFileHandler}
            data-title="photo size should not be more than 4 Mb"
            className={style.addPhotoBtn}/>
          <input
            style={{display: 'none'}}
            ref={inputRef}
            type="file"
            onChange={uploadHandler}
          />
      </div>
      <div>
        <EditableSpan
          value={username}
          onChange={changeTextHandler}
        />
        <div className={style.email}>{userEmail}</div>
        <CustomButton buttonText={'Log out'} className={style.submit} onClick={logOutHandler}/>


      </div>
    </div>
  </div>)
}