import React, { useState, useEffect } from 'react'
import { PaginationProps, PageLengthProps } from '../client/index'

function Pagination({
    data,
    totalPage,
    currentPage,
    perPage,
    onChangePage,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage
}: PaginationProps) {

    const [pages, setPages] = useState<Array<number>>([])
    const [shownPages, setShownPages] = useState<Array<number>>([])

    useEffect(() => {
        let indexOf: number = pages.indexOf(currentPage) + 1;
        let startIndex: number = indexOf - 2;
        let endIndex: number = indexOf + 3;
        let p: Array<number> = [];
        for (let index = startIndex; index < endIndex; index++) {
            p.push(index)
        }

        if (p[0] < 1) {
            p = pages.slice(0, 5)
        }

        if (p[4] > pages.length) {
            if (pages.length < 5) {
                p = pages
            } else {
                p = pages.slice(pages.length - 5, pages.length)
            }
        }
        setShownPages(p)
        return () => {
            setShownPages([])
        }
    }, [currentPage, pages])

    useEffect(() => {
        let p: Array<number> = [];
        for (let i = 1; i <= totalPage; i++) {
            p.push(i)
        }
        setPages(p)
        return () => {
            setPages([])
        }
    }, [totalPage])
    return (
        <nav className='flex items-center justify-between pt-4'>
            {
                data.length > 0 ? <span className='text-sm text-slate-600 '>Showing <span className='font-semibold'>{((currentPage - 1) * perPage) + 1}-{(((currentPage - 1) * perPage) + perPage) > data.length ? data.length : (((currentPage - 1) * perPage) + perPage)}</span> of <span className='font-semibold'>{data.length}</span>
                    <span>{` (${totalPage} pages)`}</span>
                </span> : <span className='text-sm text-slate-600 '>Showing Empty Record</span>
            }
            <ul className='inline-flex items-center -space-x-px'>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onFirstPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === 1 || data.length === 0 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300 rounded-l-md`}>
                        <span className="material-symbols-outlined text-sm">
                            first_page
                        </span>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onPreviousPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === 1 || data.length === 0 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300`}>
                        <span className="material-symbols-outlined text-sm">
                            chevron_left
                        </span>
                    </a>
                </li>
                {
                    shownPages.map((value, index) => {
                        return (
                            <li key={index} className=''>
                                <a href='#' onClick={(e) => { e.preventDefault(); onChangePage((value)); }} data-page={value} className={`${currentPage === value ? 'bg-green-500 text-white border-green-500' : 'text-slate-600 border-slate-300'} text-sm  px-3 py-2 leading-tight border`}>
                                    {value}
                                </a>
                            </li>
                        );
                    })
                }
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onNextPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === totalPage || data.length === 0 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300`}>
                        <span className="material-symbols-outlined text-sm">
                            chevron_right
                        </span>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onLastPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === totalPage || data.length === 0 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300 rounded-r-md`}>
                        <span className="material-symbols-outlined text-sm">
                            last_page
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination


export const PageLength = (
    {
        pageLength,
        onChange
    }: PageLengthProps
) => {
    return (
        <div className='flex items-center mb-3'>
            <span className='text-sm text-slate-600 me-2'>Show :</span>
            <select onChange={(e) => { onChange(e) }} id='page_length' className='px-3 py-1 rounded-md border bg-inherit text-sm text-slate-600'>
                {
                    pageLength.map((v, i) => {
                        return (
                            <option key={i} className='bg-white text-slate-600 hover:bg-slate-200' value={v}>{v}</option>
                        )
                    })
                }
            </select>
            <span className='text-sm text-slate-600 ms-2'>entries</span>
        </div>
    )
}