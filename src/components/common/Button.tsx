import React from 'react'
import MuButton from '@material-ui/core/Button'
import './Button.scss'

type ButtonProps = {
  text: string,
  type?: string
}

const Button = ({ text, type = 'default' }: ButtonProps) => (
  <MuButton className={`Button-${type}`} variant="contained">
    { text }
  </MuButton>
);

export default Button