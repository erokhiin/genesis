import React, { useCallback } from 'react'
import { css } from 'astroturf'
import classnames from 'classnames'

type Props = {
  label: string
  min: number
  max: number
  value: number
  className?: string
  onChange: (value: number) => void
}

function RangeField({ label, min, max, value, className, onChange }: Props) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    },
    [onChange],
  )
  return (
    <div className={classnames(className, s.wrap)}>
      <div className={s.text}>
        {label}: {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default RangeField

const s = css`
  .text {
    margin-bottom: 3px;
  }
`
