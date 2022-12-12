import React from 'react';
import style from './TableRow.module.css'
import {ActionButtons} from '../Actions/ActionButtons';
import {useNavigate} from 'react-router-dom';
import {setAppAlertAC, setIsOpenModalAC} from '../../../appReducer';
import {setDeckNameAC, setPackIdAC} from '../packsReducer';
import {useAppDispatch, useAppSelector} from '../../../app/store';

type TableRowPropsType = {
  packId: string
  name: string
  cardsCount: number
  updated: string
  created: string
  packUserId: string
}
export const TableRow = (props: TableRowPropsType) => {
  const dispatch = useAppDispatch()
  const userIdMy = useAppSelector(state => state.login._id)

  const navigate = useNavigate()
  const onClickViewCardsHandler = () => {
    if (props.cardsCount === 0 && props.packUserId !== userIdMy) {
      dispatch(setAppAlertAC({message: 'no cards in this pack', type: 'info'}))
    } else {
      navigate(`cardslist/${props.packId}/${props.name}`)
    }
  }

  const onStudyHandler = () => {
    if (props.cardsCount === 0) {
      dispatch(setAppAlertAC({message: 'no cards in this pack', type: 'info'}))
    } else {
      navigate(`/learnpage/${props.packId}/${props.name}`)
    }

  }
  const onEditHandler = () => {
    dispatch(setIsOpenModalAC("editPack"))
    dispatch(setPackIdAC(props.packId))
    dispatch(setDeckNameAC(props.name))
  }
  const onDeleteHandler = () => {
    dispatch(setIsOpenModalAC("deleteModal"))
    dispatch(setDeckNameAC(props.name))
    dispatch(setPackIdAC(props.packId))
  }
  return (
    <tr className={style.rowTableData}>
      <td className={style.Name} onClick={onClickViewCardsHandler}>{props.name}</td>
      <td style={{width: '171px'}}>{props.cardsCount}</td>
      <td style={{width: '186px'}}>{props.updated}</td>
      <td style={{width: '181px'}}>{props.created}</td>
      <td style={{width: '181px'}}>{
        <ActionButtons
          stady={onStudyHandler}
          edit={onEditHandler}
          delete={onDeleteHandler}
          currentUserId={props.packUserId}
        />}</td>
    </tr>
  );
};
