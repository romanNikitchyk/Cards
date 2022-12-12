import React, {useState, ChangeEvent,} from 'react'
import s from './EditableSpan.module.css'
import {TextField} from "@material-ui/core";

type PropsType = {
  value: string
  onChange: (value: string) => void
}

const EditableSpan = React.memo((props: PropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [text, setText] = useState(props.value)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  const activateEditMode = () => {
    setEditMode(true)
  }

  const onClickSaveHandler = () => {
    props.onChange(text)
    setEditMode(false)
  }

  return (
    <div>
      {editMode ? (
        <div className={s.wrap}>
          <TextField
            autoFocus
            onChange={onChangeHandler}
            value={text}
          />
          <button onClick={onClickSaveHandler} className={s.saveBtn}>
            SAVE
          </button>
        </div>
      ) : (
        <span onClick={activateEditMode} className={s.default}>
          {props.value}
        </span>
      )}
    </div>
  )
})

export default EditableSpan
