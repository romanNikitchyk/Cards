import React, {KeyboardEvent, ChangeEvent, useState, useEffect} from 'react';
import {TextField} from "@material-ui/core";
type SearchFilterPropsType = {
  nameOfEntity: string
  onEnter:(value:string)=>void
  styled: {width:string}
}
export const SearchFilter = (props:SearchFilterPropsType) => {
  const [value, setValue] = useState<string>(props.nameOfEntity)
const ret = props.styled

  useEffect(()=>{
    setValue(props.nameOfEntity)
  },[props.nameOfEntity])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      props.onEnter(value)
    }
  }
  return (
    <div>
      <TextField
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onEnterHandler}
        placeholder={'Provide your text and press Enter'}
        style={ret}
      />
    </div>
  );
};
