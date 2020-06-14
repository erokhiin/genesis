import React from 'react'
import { css } from 'astroturf'
import classnames from 'classnames'

type Props = {
  children: React.ReactChild
  className?: string
  onClick?: () => void
}

function Button({ children, className, onClick }: Props) {
  return (
    <button className={classnames(className, s.button)} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

const s = css`
  .button {
    border: none;
    background-color: #198;
    padding: 10px;
    color: #fff;
    cursor: pointer;
    margin-bottom: 10px;
    font-family: 'Avenir';
    font-size: 14px;
  }
`
