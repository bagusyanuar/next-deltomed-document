import React from 'react'
import { HeaderType } from '../client'
import { RowData, ColumnFormat } from '../utilities'

interface BodyProps {
    data: Array<RowData>,
    headers: Array<HeaderType>,
    withIndex: boolean
}
function Body({
    data,
    headers,
    withIndex = false
}: BodyProps) {
    return (
        <tbody>
            {
                data.map((value, index) => {
                    return (
                        <tr key={index} className='bg-white border-b'>
                            {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{(index + 1)}</td> : ''}
                            {
                                headers.map((v, i) => {
                                    return (
                                        <td key={i} className={`px-6 py-3 text-gray-500 whitespace-nowrap`}>
                                            {value.row[i]}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
    )
}

export default Body