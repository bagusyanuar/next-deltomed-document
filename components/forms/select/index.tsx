import Select from './select'
export type SelectDataFormat = {value: string | number, text: string}
export interface SelectProps { data: Array<SelectDataFormat>, onChange: (v: string) => void, className?: string }
export interface SelectIconProps extends SelectProps { icon?: string } 

export default Select