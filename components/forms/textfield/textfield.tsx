import React from 'react'
import { TextfieldProps } from './index'

function Textfield({
    type = 'text',
    value,
    onChange,
    className = '',
    placeholder = 'placeholder',
    disabled = false
}: TextfieldProps) {
    const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        let value: string = e.currentTarget.value
        onChange(e, value)
    }
    return (
        <input
            disabled={disabled}
            onChange={onHandleChange}
            placeholder={placeholder}
            type={type}
            value={value}
            className={`text-sm form-input rounded-md border border-slate-400 py-2 px-2.5 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:border-slate-500 ${className}`} />
    )
}

export default Textfield