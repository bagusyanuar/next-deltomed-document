import React, { useState, useEffect } from 'react'
import Pagination, { PageLength } from '../components/pagination'
import TableHeader from '../components/header'
import TableBody from '../components/body'
import { TableProps, RowData } from './index'
import { CreateTableData, SortData } from '../utilities'

function Table({
    headers,
    data,
    column,
    pageLength = [5, 10, 25],
    withIndex = true,
    pagination = true,
    onSorted = (d) => {}
}: TableProps) {
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(pageLength[0])
    const [rowData, setRowData] = useState<Array<RowData>>([])
    const [sort, setSort] = useState<string>('ASC')
    const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value)
        setPerPage(value)
    }

    const handleSort = (index: number) => {
        if (sort === 'ASC') {
            setSort('DESC')
        } else {
            setSort('ASC')
        }
        let sorted = SortData(rowData, index, sort)
        if (onSorted !== undefined) {
            let dataSorted: Array<any> = []
            sorted.forEach(v => {
                dataSorted.push(v.original)
            });
            onSorted(dataSorted)
            console.log(dataSorted);
            
        }
    }

    const handleChangePage = (page: number) => {
        setPage(page)
    }

    const handleNextPage = () => {
        if (page < totalPage) {
            setPage(page + 1);
        }
    }

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleFirstPage = () => {
        setPage(1)
    }

    const handleLastPage = () => {
        setPage(totalPage)
    }

    useEffect(() => {
        let results = CreateTableData(data, column)
        setRowData(results)
    }, [data, column])

    useEffect(() => {
        if (pagination) {
            let t = Math.ceil(data.length / perPage);
            setTotalPage(t)
            if (page > t && page > 1) {
                setPage(t)
            }
        }

        return () => {
            setTotalPage(0)
        }
    }, [perPage, data.length, pagination])
    return (
        <div>
            {
                pagination ? <PageLength pageLength={pageLength} onChange={(e) => { handleChangePerPage(e) }} /> : ''
            }
            <div className='relative overflow-auto shadow-md sm:rounded-lg border border-slate-200 mb-2'>
                <table className='rounded-md overflow-x-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <TableHeader headers={headers} withIndex={withIndex} onSort={(index) => { handleSort(index) }} />
                    <TableBody data={rowData} headers={headers} withIndex={withIndex} pagination={pagination} page={page} perPage={perPage}/>
                </table>
            </div>
            {
                pagination ? <Pagination
                    data={rowData}
                    totalPage={totalPage}
                    currentPage={page}
                    perPage={perPage}
                    onChangePage={(p) => { handleChangePage(p) }}
                    onNextPage={() => { handleNextPage() }}
                    onPreviousPage={() => { handlePreviousPage() }}
                    onFirstPage={() => { handleFirstPage() }}
                    onLastPage={() => { handleLastPage() }}
                /> : ''
            }
        </div>
    )
}

export default Table
