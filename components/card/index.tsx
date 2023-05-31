import React from 'react'

function Index({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='w-full rounded-md bg-white shadow-md'>
            <div className='h-1 w-full bg-green-500 rounded-t-md'></div>
            <div className='py-4 px-4'>
                {children}
            </div>
        </div>
    )
}

export default Index