import React, { ChangeEvent, DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react'
import s from './Select.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>
type PropsType = DefaultSelectPropsType & {
  options?: string[]
  onChangeOption?: (option: string) => void
}

const Select: FC<PropsType> = ({ options, onChange, onChangeOption, className, ...restProps }) => {
  const mappedOptions = options
    ? options.map((op, i) => {
        return (
          <option key={i} value={op}>
            {op}
          </option>
        )
      })
    : []

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    onChangeOption && onChangeOption(e.currentTarget.value)
    onChange && onChange(e)
  }

  const finalClassName = `${s.default} ${className}`

  return (
    <span className={finalClassName}>
      <select onChange={onChangeCallback} {...restProps}>
        {mappedOptions}
      </select>
    </span>
  )
}

export default Select
