import React, { useState, useEffect } from 'react'

interface PaginationProps {
    data: Array<any>,
    totalPage: number,
    currentPage: number,
    perPage: number,
    onChangePage: (page: number) => void,
    onNextPage: () => void,
    onPreviousPage: () => void,
    onLastPage: () => void,
    onFirstPage: () => void,
}

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
    return (
        <nav className='flex items-center justify-between pt-4'>
            {
                data.length > 0 ? <span className='text-sm text-slate-600 '>Showing <span className='font-semibold'>{((currentPage - 1) * perPage) + 1}-{(((currentPage - 1) * perPage) + perPage) > data.length ? data.length : (((currentPage - 1) * perPage) + perPage)}</span> of <span className='font-semibold'>{data.length}</span>
                    <span>{` (${totalPage} pages)`}</span>
                </span> : <span className='text-sm text-slate-600 '>Showing Empty Record</span>
            }
            <ul className='inline-flex items-center -space-x-px'>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onFirstPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === 1 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300 rounded-l-md`}>
                        <span className="material-symbols-outlined text-sm">
                            first_page
                        </span>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onPreviousPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === 1 ? 'text-slate-400' : 'text-slate-600'} border border-slate-300`}>
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
                    <a href='#' onClick={(e) => { e.preventDefault(); onNextPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === totalPage ? 'text-slate-400' : 'text-slate-600'} border border-slate-300`}>
                        <span className="material-symbols-outlined text-sm">
                            chevron_right
                        </span>
                    </a>
                </li>
                <li>
                    <a href='#' onClick={(e) => { e.preventDefault(); onLastPage() }} className={`px-3 py-2 ml-0 leading-tight text-sm ${currentPage === totalPage ? 'text-slate-400' : 'text-slate-600'} border border-slate-300 rounded-r-md`}>
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

interface PageLengthProps {
    pageLength: Array<number>,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

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