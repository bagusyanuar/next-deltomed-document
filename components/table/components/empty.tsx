import React from 'react'
import { EmptyBodyProps } from '../client/index'

function Empty({
    coloumnCount = 0,
    message = 'No Record Found'
}: EmptyBodyProps) {
    return (
        <tr>
            <td colSpan={coloumnCount} className='text-center py-4 text-gray-500 whitespace-nowrap'>{message}</td>
        </tr>
    )
}

export default Empty