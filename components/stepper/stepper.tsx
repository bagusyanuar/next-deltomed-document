import React, { useState } from 'react'
import { StepperProps } from './index'
function Stepper({
    data,
    onChange = (v) => { }
}: StepperProps) {
    const [active, setActive] = useState<number>(0)

    const handleClick = (v: number) => {
        setActive(v)
        onChange(v)
    }
    return (
        <ol className="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
            {
                data.map((v, i) => {
                    return (
                        <li key={i}>
                            <a href='#' onClick={(e) => { e.preventDefault(); handleClick((i)) }} className={`flex items-center ${i === active ? 'text-blue-600' : 'text-gray-500'} space-x-2.5`}>
                                <span className={`flex items-center justify-center w-8 h-8 border ${i === active ? 'border-blue-600' : 'border-gray-500'} rounded-full shrink-0`}>
                                    {i + 1}
                                </span>
                                <span>
                                    <h3 className="font-medium leading-tight">{v}</h3>
                                </span>
                            </a>
                        </li>
                    )
                })
            }
        </ol>
    )
}

export default Stepper