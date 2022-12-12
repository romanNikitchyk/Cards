import React, {ChangeEvent, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {CardType} from "../../api/api";
import {RootState, useAppDispatch} from "../../app/store";
import {getCardsTC, setCardGradeTC} from "../CardsList/cardsReducer";
import style from "./LearnPage.module.css";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import {CustomButton} from "../../components/CustomButton/CustomButton";

const grades = ['Didn\'t know', 'Forgot', 'Thought for a long time', 'Mixed up', 'Knew'];

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return {sum: newSum, id: newSum < rand ? i : acc.id}
    }
    , {sum: 0, id: -1});
  return cards[res.id + 1];
}

export const LearnPage = () => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const {cards} = useSelector((store: RootState) => store.cards);
  const {currentPackId, packName} = useParams();
  const [value, setValue] = useState<string>('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  const [card, setCard] = useState<CardType>({
    answer: 'answer fake',
    cardsPack_id: '',
    comments: '',
    created: '',
    grade: 0,
    more_id: '',
    question: 'question fake',
    rating: 0,
    shots: 0,
    type: '',
    updated: '',
    user_id: '',
    __v: 0,
    _id: 'fake',
  });

  useEffect(() => {
    if (first) {
      dispatch(getCardsTC(currentPackId));
      setFirst(false);
    }
    if (cards.length > 0) setCard(getCard(cards));
    return () => {
    }
  }, [first,cards]);

  const onNextHandler = () => {
    setIsChecked(false);
    dispatch(setCardGradeTC({grade: +value, card_id: card._id}))
    setValue('')

    if (cards.length > 0) {
      setCard(getCard(cards));
    }
  }
  const onShowAnswer = () => {
    setIsChecked(true)
  }

  return (<div className={style.container}>
    <Link className={style.link} to={'/packslist'}>
      Back to Packs List
    </Link>
    <h2 style={{
      position: 'absolute',
      top: '120px',
    }}>Learn "{packName}"</h2>
    <div className={style.learnPageBefore}>
      <div className={style.question}>
        <div><span style={{fontSize: '16px', fontWeight: '600'}}>Question: </span>{card.question}</div>
        {!isChecked && <CustomButton buttonText={'Show answer'} variant={'contained'} style={{marginTop: 20}} onClick={onShowAnswer}/>}
      </div>
      {isChecked && <div className={style.answer}>
        <div><span style={{fontSize: '16px', fontWeight: '600'}}>Answer: </span> {card.answer}</div>
        <FormControl style={{marginLeft: '50px'}}>
          <FormLabel id="demo-controlled-radio-buttons-group">Rate yourself:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {grades.map((el, i) => (
              <FormControlLabel key={i} value={i + 1} control={<Radio/>} label={el}/>
            ))}
          </RadioGroup>
        </FormControl>
        <CustomButton variant={'contained'} disabled={value === ''} onClick={onNextHandler} buttonText={'Next'}/>
      </div>
      }
    </div>
  </div>);
};

