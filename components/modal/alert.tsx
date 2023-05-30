import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export enum AlertTypes {
    success = 'success',
    error = 'error'
}
function Alert({
    isOpen,
    callback,
    message,
    type
}: {
    isOpen: boolean,
    callback?: () => void,
    message: string,
    type: AlertTypes
}) {
    const [isShow, setIsShow] = useState<boolean>(false)
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsShow(true)
            }, 50);
        } else {
            setIsShow(false)
        }
    }, [isOpen])

    let color = 'bg-green-500';
    let hoverColor = 'bg-green-600';
    if (type !== AlertTypes.success) {
        color = 'bg-red-500';
        hoverColor = 'bg-red-600';
    }
    return (
        <div className={`${isOpen ? '' : 'hidden'} absolute z-50 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            <div className={`${isShow ? '' : 'opacity-0 scale-50'} transform  relative w-10/12 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-lg transition-opacity transition-transform ease-in-out duration-[300ms]`}>
                <div className='px-4 py-6'>
                    <div className='w-full flex justify-center mb-5'>
                        <Image src={`/assets/${type}.svg`} width={200} height={200} alt="error" />
                    </div>
                    <p className='mt-5 font-bold text-gray-600 text-center text-sm'>{type === AlertTypes.success ? 'SUCCESS' : 'ERROR'}</p>
                    <p className='text-gray-600 text-center text-sm mb-5'>{message}</p>
                    <div className='flex justify-center mt-3'>
                        <button
                            onClick={callback}
                            type='button'
                            className={`flex items-center text-sm ${color} rounded-md py-1 px-4 text-white hover:${hoverColor} transition-colors ease-in duration-200`}
                        >
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alert