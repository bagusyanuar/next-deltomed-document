import React from 'react'
import { ButtonProps } from './index'

function Button({
    onClick, children
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className='flex items-center text-sm rounded-md py-2 px-4 text-white bg-green-500 hover:bg-green-600 transition-colors ease-in duration-200'
        >
            {children}
        </button>
    )
}

export default Button