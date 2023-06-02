import { RowData, ColumnFormat } from './client'

const ConvertDotNested = (object: any | undefined, key: string) => {
    let keys: Array<any> = key.split('.')
    for (let i = 0; i < keys.length; i++) {
        if (typeof object !== undefined) {
            object = object[keys[i]];
        }
    }
    return object
}

export const CreateTableData = (data: Array<any>, columns: Array<ColumnFormat>): Array<RowData> => {
    let results: Array<RowData> = [];

    data.forEach((v, i) => {
        let rowData: Array<any> = [];
        columns.forEach((vColumn, iColumn) => {
            let tmpRow: any = ''
            if (vColumn.value !== null && vColumn.value !== undefined) {
                tmpRow = ConvertDotNested(v, vColumn.value)
            } else {
                if (vColumn.render !== undefined) {
                    tmpRow = vColumn.render(v)
                }
            }
            rowData.push(tmpRow)
        })
        results.push({
            original: v,
            row: rowData
        })
    })
    return results
}

export const SortData = (data: Array<RowData>, key: number, sort: string): Array<RowData> => {
    let d: Array<RowData> = [...data]
    let sorted: Array<RowData> = [];

    if (sort === 'DESC') {
        sorted = d.sort((a, b) => (a.row[key] < b.row[key]) ? 1 : ((b.row[key] > a.row[key]) ? -1 : 0))
    } else {
        sorted = d.sort((a, b) => (a.row[key] > b.row[key]) ? 1 : ((b.row[key] > a.row[key]) ? -1 : 0))
    }
    return sorted
}