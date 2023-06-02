import React from 'react'
import { HeaderType, RowData, BodyProps } from '../client'
import EmptyRecord from './empty'


function Body({
    data,
    headers,
    withIndex = true,
    page = 1,
    perPage = 0,
    pagination = true
}: BodyProps) {
    if (data.length <= 0) {
        let coloumnCount = withIndex ? (headers.length + 1) : headers.length;
        return (
            <tbody>
                <EmptyRecord coloumnCount={coloumnCount} message={`No Record Found`} />
            </tbody>
        )
    }
    return (
        <tbody>
            {
                pagination ?
                    <PaginationBody headers={headers} data={data} withIndex={withIndex} page={page} perPage={perPage} />
                    : <DefaultBody headers={headers} data={data} withIndex={withIndex} />
            }
        </tbody>
    )
}

export default Body

const DefaultBody = ({ headers, data, withIndex }: BodyProps) => {
    return (
        <>
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
        </>
    )
}

const PaginationBody = ({ data, page = 1, perPage = 0, headers, withIndex }: BodyProps) => {
    return (
        <>
            {
                data.slice(((page - 1) * perPage), (page * perPage)).map((value, index) => {
                    return (
                        <tr key={index} className='bg-white border-b'>
                            {withIndex ? <td className={`px-6 py-3 text-gray-500 whitespace-nowrap w-1`}>{((index + 1) + ((page - 1) * perPage))}</td> : ''}
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
        </>
    )
}