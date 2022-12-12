import React, {useEffect} from 'react';
import {SearchFilter} from "../PacksList/SettingsBar/SearchFilter/SearchFilter";
import style from "./CardsList.module.css";
import {addNewCardTC, deliteCardTC, editCardTC, getCardsTC, setCardAnswerAC, setCurenetPackIdAC} from "./cardsReducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {CardTableRow} from "./CardTableRow/CardTableRow";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import {setAppAlertAC, setIsOpenModalAC} from "../../appReducer";
import {Preloader} from "../../components/Preloader/Preloader";
import {CustomButton} from "../../components/CustomButton/CustomButton";
import {DeleteModalWindow} from "../Modals/DeleteModalWindow/DeleteModalWindow";
import {
  AddEditCardModalWindow,
  textFieldAddNewCardDataType
} from "../Modals/AddEditCardModalWindow/AddEditCardModalWindow";


export const CardsList = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const mode = useAppSelector(state => state.app.preloader)
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const cards = useAppSelector(state => state.cards.cards)
  const cardQuestion = useAppSelector(state => state.cards.cardQuestion)
  const user_id = useAppSelector(state => state.login._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const isOpenModal = useAppSelector(state => state.app.isOpenModal)
  const currentCardQuesAnsw = useAppSelector(state => state.cards.currentCardQuesAnsw)
  const {currentPackId, packName} = useParams<'currentPackId' | 'packName'>()
  const currentCardId = useAppSelector(state => state.cards.currentCardId)

  useEffect(() => {
    dispatch(getCardsTC(currentPackId))
  }, [dispatch, currentPackId])

  const renderHeadCardsTableRow = () => {
    return <tr style={{height: '48px'}}>
      <th className={style.question}>Question</th>
      <th className={style.answer}>Answer</th>
      <th className={style.lastUpdated}>LastUpdated</th>
      <th className={style.grade}>Grade</th>
    </tr>
  }

  const renderCards = () =>
    cards.map((el) => {
      return (
        <CardTableRow key={el._id}
                      cardId={el._id}
                      question={el.question}
                      answer={el.answer}
                      updated={el.updated}
                      grade={el.grade}
                      currentUserId={el.user_id}
                      packName={packName}
        />
      )
    });
  const onEnterSearchHandler = (value: string) => {
    dispatch(setCardAnswerAC(value))
    dispatch(getCardsTC())
    dispatch(setCardAnswerAC(''))
  }

  const onClickAddCardHandler = () => {
    if (currentPackId) {
      dispatch(setCurenetPackIdAC(currentPackId))
    }
    dispatch(setIsOpenModalAC("addNewCard"))
  }

  const onClickLearnPackHandler = () => {
    if (cards.length === 0) {
      dispatch(setAppAlertAC({message: 'No cards in this pack', type: 'warning'}))
    } else {
      navigate(`/learnpage/${currentPackId}/${packName}`)
    }
  }

  const onSubmitAddNewCardHandler = (data: textFieldAddNewCardDataType) => {
    dispatch(addNewCardTC(data))
  }
  const onSubmitEditCardHandler = (data: textFieldAddNewCardDataType) => {
    dispatch(editCardTC(data))
  }
  const onDeleteCardHandler = () => {
    dispatch(deliteCardTC(currentCardId))
    dispatch(setIsOpenModalAC('close'))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (<>
      {isOpenModal === 'addNewCard' && <AddEditCardModalWindow
        onSubmit={onSubmitAddNewCardHandler}
        title={'Add new card'}
      />}
      {isOpenModal === 'editCard' && <AddEditCardModalWindow
        title={'Edit card'}
        defaultValue={currentCardQuesAnsw}
        onSubmit={onSubmitEditCardHandler}
      />}
      {isOpenModal === 'deleteModal' && <DeleteModalWindow
        title={'Delete Card'}
        modalText={`Do you really want to remove "${currentCardQuesAnsw.question}"?`}
        onDelete={onDeleteCardHandler}
      />}

      <Link className={style.link} to={'/packslist'}>
        Back to Packs List
      </Link>

      {packUserId === user_id
        ? <CustomButton className={style.button} onClick={onClickAddCardHandler} variant="contained"
                        buttonText={'Add new Card'}/>
        :
        <CustomButton className={style.button} onClick={onClickLearnPackHandler} variant={'contained'}
                      buttonText={'Stady to Pack'}/>
      }

      <div className={style.tableWrap}>
        <h2 className={style.title}>{packName}</h2>
        <div className={style.wrapSearch}>
          <SearchFilter
            styled={{width: '1008px'}}
            nameOfEntity={cardQuestion}
            onEnter={onEnterSearchHandler}/>
        </div>
        <table className={style.headTable}>
          <thead>
          {renderHeadCardsTableRow()}
          </thead>
          <tbody>
          {mode && <Preloader/>}
          {!mode && renderCards()}
          </tbody>
        </table>
      </div>
    </>
  );
};

