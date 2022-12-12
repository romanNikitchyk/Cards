import React from 'react';
import style from "../../PacksList/TableRow/TableRow.module.css";
import {Rating} from "@material-ui/lab";
import StarIcon from '@mui/icons-material/Star';
import {ActionButtons} from "../../PacksList/Actions/ActionButtons";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {setAppAlertAC, setIsOpenModalAC} from "../../../appReducer";
import {setCurrenetCardIdIdAC, setCurrenetCardNameAC} from "../cardsReducer";
import {useLocation, useNavigate} from "react-router-dom";

type CardsTableRowPropsType = {
  currentUserId: string
  cardId: string
  grade: number
  question: string
  answer: string
  updated: string
  packName?:string
}
export const CardTableRow = (props: CardsTableRowPropsType) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const checkURL = location.pathname.slice(0, 20) === '/packslist/cardslist'
  const currentPackId = location.pathname.slice(21, 45)
  const cards = useAppSelector(state => state.cards.cards)

  const onStudyHandler = () => {
    if(cards.length === 0){
      dispatch(setAppAlertAC({message:'No cards in this pack', type:'warning'}))
    } else {
      navigate(`/learnpage/${currentPackId}/${props.packName}`)
    }

  }
  const onEditHandler = () => {
    dispatch(setIsOpenModalAC("editCard"))
    dispatch(setCurrenetCardIdIdAC(props.cardId))
    dispatch(setCurrenetCardNameAC({question: props.question, answer: props.answer}))
  }
  const onDeleteHandler = () => {
    dispatch(setIsOpenModalAC("deleteModal"))
    dispatch(setCurrenetCardNameAC({question: props.question, answer: props.answer}))
    dispatch(setCurrenetCardIdIdAC(props.cardId))
  }
  return (
    <tr className={style.rowTableData}>
      <td style={{width: '267px'}}>{props.question}</td>
      <td style={{width: '171px'}}>{props.answer}</td>
      <td style={{width: '186px'}}>{props.updated}</td>
      <td style={{width: '181px'}}>
        <div className={style.gradeWrapper}>
          <Rating
            name="text-feedback"
            value={props.grade}
            readOnly
            precision={0.2}
            emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit"/>}
          />
          <ActionButtons edit={onEditHandler}
                         delete={onDeleteHandler}
                         stady={onStudyHandler}
                         currentUserId={props.currentUserId}
                         checkURL={checkURL}
          />
        </div>
      </td>
    </tr>
  )
}