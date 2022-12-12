import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  FocusEvent,
  useState,
} from 'react'
import style from './InputCustom.module.css'
import {TextField} from "@material-ui/core";
type PropsType = {
  placeholder?: string
  settings?: any
  label?: any

}

export const InputCustom = (props:PropsType) => {
  const [visibility, setVisibility] = useState<boolean>(false)
  const eyeOpen =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'/%3E%3C/svg%3E\")"

  const eyeClose =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M11.83 9L15 12.16V12a3 3 0 00-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 003 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 01-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22 21 20.73 3.27 3M12 7a5 5 0 015 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7z'/%3E%3C/svg%3E\")"

  const onHiddenHandler = () => {
    setVisibility((visibility) => !visibility)
  }
  return(<div className={style.wrapInput}>
      <TextField label={props.label} type={visibility ? 'text' : 'password'}
             placeholder={props.placeholder}
             {...props.settings}
        autoComplete={'off'}
             />
      <button
      type={'button'}
      className={style.button}
      onClick={onHiddenHandler}
      style={{
        backgroundImage: visibility ? eyeOpen : eyeClose,
      }}
      />
  </div>

  )
}