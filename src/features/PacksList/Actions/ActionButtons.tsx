import React from 'react';
import {useAppSelector} from "../../../app/store";
import style from './ActionButtons.module.css'

type ActionButtonsPropsType = {
  currentUserId: string
  stady: () => void
  edit: () => void
  delete: () => void
  checkURL?: boolean
}

export const ActionButtons = (props: ActionButtonsPropsType) => {
  const user_id = useAppSelector(state => state.login._id)


  const onStudyHandler = () => {
    props.stady()
  }
  const onEditHandler = () => {
    props.edit()
  }
  const onDeleteHandler = () => {
    props.delete()
  }
  return (
    <div>
      {props.currentUserId === user_id ? (
          <>
            <button className={style.buttonStudy} onClick={onStudyHandler}/>
            <button className={style.buttonEdit} onClick={onEditHandler}/>
            <button className={style.buttonDelete} onClick={onDeleteHandler}/>
          </>
        )
        :  !props.checkURL  && <button className={style.buttonStudy} onClick={onStudyHandler}/> }
    </div>
  );
};

