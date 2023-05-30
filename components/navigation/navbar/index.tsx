import React, { useState, useEffect, useRef, MutableRefObject, forwardRef } from 'react'

function useOuterClick(callback: () => void): any {
    const innerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        window.addEventListener('click', handleClick);
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLDivElement
                | HTMLInputElement
                | HTMLParagraphElement
                | HTMLButtonElement
                | HTMLHeadingElement;
            if (target?.contains(innerRef.current) && target !== innerRef.current) {
                callback()
            }

        };
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [innerRef]);

    return innerRef;
}

function Index({
    title,
    username
}: {
    title: string,
    username: string
}) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const ref = useOuterClick(() => {
        setIsOpen(false)
    })

    const toggleOpen = () => {
        setIsOpen(current => !current)
    }

    return (
        <div className='w-full h-12 flex items-center justify-between px-5 sm:px-3 md:px-3 lg:px-5'>
            <div className='flex items-center'>
                <p className='font-bold text-2xl text-gray-600'>{title}</p>
            </div>
            <div className='flex items-center'>
                <span className="material-symbols-outlined text-gray-600 mr-1">
                    notifications
                </span>
                <div className='relative inline-block text-left'>
                    <button ref={ref} onClick={toggleOpen} type="button" className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-600" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        {username}
                        <svg className="-mr-1 h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <div className={`${isOpen ? "absolute transition ease-in duration-75" : "hidden transition ease-out duration-100"} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-2`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                        <div className="py-1 px-1" role="none">
                            <a href='#' onClick={() => { }} className="text-gray-600 block w-full px-4 py-2 text-left text-sm hover:bg-slate-100" role="menuitem" tabIndex={-1} id="menu-item-3">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index