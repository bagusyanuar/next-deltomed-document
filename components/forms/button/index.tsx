import React from 'react'
import Button from './button'

export interface ButtonProps { onClick: () => void, children: React.ReactNode }
export interface ButtonLoadingProps extends ButtonProps {isLoading: boolean}

export default Button
