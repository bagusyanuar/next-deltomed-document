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
                                <span className={`text-sm flex items-center justify-center w-8 h-8 border ${i === active ? 'border-blue-600' : 'border-gray-500'} rounded-full shrink-0`}>
                                    {i + 1}
                                </span>
                                <span>
                                    <p className="text-sm font-medium leading-tight">{v}</p>
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

export const Shimmer = () => {

    const data: Array<string> = ['1', '2', '3'];
    return (
        <ol className="items-center justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
            {
                data.map((v, i) => {
                    return (
                        <li key={i} className='animate-pulse'>
                            <a href='#' onClick={(e) => { }} className={`flex items-center space-x-2.5`}>
                                <span className={`text-sm flex items-center justify-center w-8 h-8 bg-slate-300 rounded-full shrink-0`}>
                                    {/* {i + 1} */}
                                </span>
                                <div className='w-20 h-2 bg-slate-300 rounded-md'></div>
                            </a>
                        </li>
                    )
                })
            }
        </ol>
    )
}