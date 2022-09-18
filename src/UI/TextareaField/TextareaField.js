import React from "react"
import { forwardRef } from "react"

import "./TextareaField.scss"

const Textarea = (
  {
    type,
    className,
    value,
    onChange,
    onKeyDown,
    onBlur,
    disabled,
    placeholder,
    autoFocus,
  },
  ref
) => (
  <textarea
    type={type}
    ref={ref}
    className={className}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    onBlur={onBlur}
    disabled={disabled}
    spellCheck="false"
    autoFocus={autoFocus || false}
  ></textarea>
)

export const TextareaField = forwardRef(Textarea)
