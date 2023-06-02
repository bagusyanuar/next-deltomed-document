import React from 'react'
import Textfield from './textfield'

export interface TextfieldProps { type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void, className?: string, placeholder?: string, disabled?: boolean }
export default Textfield
