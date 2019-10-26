import React from 'react'
import MuButton from '@material-ui/core/Button'
import './Button.scss'

type ButtonProps = {
  text: string,
  color?: string
}

const Button = ({ text, color = 'orange' }: ButtonProps) => (
  <MuButton className={`Button-${color}`} variant="contained">
    { text }
  </MuButton>
);

export default Button