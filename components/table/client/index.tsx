import React, { useState, useEffect } from 'react'
import Pagination, { PageLength } from '../components/pagination'
import TableHeader from '../components/header'
import TableBody from '../components/body'
import { CreateTableData, RowData, ColumnFormat } from '../utilities'

interface TableProps {
    headers: Array<HeaderType>,
    data: Array<any>,
    column: Array<ColumnFormat>,
    pageLength?: Array<number>,
    withIndex?: boolean
}

function Index({
    headers,
    data,
    column,
    pageLength = [5, 10, 25],
    withIndex = true
}: TableProps) {
    const [perPage, setPerPage] = useState<number>(pageLength[0])
    const [rowData, setRowData] = useState<Array<RowData>>([])

    const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value)
        setPerPage(value)
    }

    const handleSort = (index: number) => {
        console.log(index);

    }

    useEffect(() => {
        let results = CreateTableData(data, column)
        console.log(results);
        
        setRowData(results)
    }, [data, column])
    return (
        <div>
            <PageLength pageLength={pageLength} onChange={(e) => { handleChangePerPage(e) }} />
            <div className='relative overflow-auto shadow-md sm:rounded-lg border border-slate-200 mb-2'>
                <table className='rounded-md overflow-x-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <TableHeader headers={headers} withIndex={withIndex} onSort={(index) => { handleSort(index) }} />
                    <TableBody data={rowData} headers={headers} withIndex={withIndex} />
                </table>
            </div>
        </div>
    )
}

export default Index

export type HeaderType = { value: string, className?: string | undefined, sort?: boolean | undefined }

const defaultHeaderType = { className: '', sort: false }