import React from 'react';
import {Button} from "@material-ui/core";

type CustomButtonPropsType = {
  className?: string
  onClick?: () => void
  variant?: 'text' | 'outlined' | 'contained'
  buttonText: string
  color?: 'inherit' | 'primary' | 'secondary' | 'default'
  disabled?: boolean
  type?: 'submit'
  size?: 'small' | 'medium' | 'large'
  style?: {}
}
export const CustomButton = (props: CustomButtonPropsType) => {
  return (
    <Button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
      variant={props.variant}
      color={props.color}
      disabled={props.disabled}
      size={props.size}
      style={props.style}
    >{props.buttonText}</Button>
  );
};

