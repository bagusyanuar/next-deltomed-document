import React, { useState, useEffect } from 'react'

function Index({
    isOpen,
    onClose,
    children,
    title
}: {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode,
    title: string
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

    const handleClose = () => {
        onClose()
    }
    return (
        <div className={`${isOpen ? '' : 'hidden'} absolute z-30 inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0`}>
            {/* modal */}
            <div className={`${isShow ? '' : 'opacity-0 -translate-y-full'} transform  relative w-10/12 md:w-1/4 bg-white rounded shadow-lg transition-opacity transition-transform ease-in-out duration-[700ms]`}>
                {/* header */}
                <div className='px-4 py-3 border-b border-gray-200'>
                    <div className='flex text-slate-600 text-sm items-center justify-between'>
                        <div className='font-semibold'>{title}</div>
                        <button onClick={handleClose}>
                            <span className="material-symbols-outlined text-sm">
                                close
                            </span>
                        </button>
                    </div>
                </div>

                {/* body */}
                <div className='px-4 py-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Index