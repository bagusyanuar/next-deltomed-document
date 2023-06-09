import React from 'react'
import Button from './button'
import ButtonWithLoading from './with-loading'

export interface ButtonProps { onClick: () => void, children: React.ReactNode }
export interface ButtonLoadingProps extends ButtonProps {isLoading: boolean}
export const ButtonLoading = ButtonWithLoading
export default Button
