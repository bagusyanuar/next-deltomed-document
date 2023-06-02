import React from 'react'
import { SelectIconProps } from './index'

function Select({
    icon = 'circle',
    data,
    onChange = (v) => { },
    className = ''
}: SelectIconProps) {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let value = e.target.value
        onChange(value)
    }
    return (
        <label className="relative text-gray-400 focus-within:text-gray-600 block mb-2">
            <span className="material-symbols-outlined pointer-events-none w-4 h-4 absolute top-2.5 left-3 text-sm">
                {icon}
            </span>
            <select onChange={(e) => { handleChange(e) }} className={`text-sm rounded-md border border-slate-400 py-2 px-2 bg-white placeholder-gray-400 text-gray-500 w-full block pl-8 focus:outline-none focus:border-slate-500 ${className}`}>
                {
                    data.map((v, i) => {
                        return (
                            <option key={i} className='bg-white text-slate-600 hover:bg-slate-200' value={v.value}>{v.text}</option>
                        )
                    })
                }
            </select>
        </label>
    )
}

export default Select