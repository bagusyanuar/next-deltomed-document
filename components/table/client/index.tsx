import Table from './table'

export type HeaderType = { value: string, className?: string | undefined, sort?: boolean | undefined }
export type RowData = { original: any, row: Array<any> }
export type ColumnFormat = { value?: string | undefined | null, render?: (data: any) => any }

export interface TableProps { headers: Array<HeaderType>, data: Array<any>, column: Array<ColumnFormat>, pageLength?: Array<number>, withIndex?: boolean, pagination?: boolean, onSorted?: (d: Array<any>) => void}
export interface BodyProps { data: Array<RowData>, headers: Array<HeaderType>, withIndex?: boolean, pagination?: boolean, page?: number, perPage?: number }
export interface HeaderProps { headers: Array<HeaderType>, withIndex: boolean, onSort?: (index: number) => void }
export interface PaginationProps {
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

export interface PageLengthProps { pageLength: Array<number>, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }
export default Table