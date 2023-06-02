import React, { useState, useEffect } from 'react'
import MyCard from '../../../components/card'
import MyModal from '../../../components/modal'
import MyButton from '../../../components/forms/button'
import MyButtonLoading from '../../../components/forms/button/with-loading'
import MyTextfield from '../../../components/forms/textfield'
import MyTable, { HeaderType, ColumnFormat } from '../../../components/table/client'
import TableAction from '../../../components/table/components/action'

import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectState, sort } from '../../../redux/features/production/slice'
import { getData, create, PostData } from '../../../redux/features/production/action'

const tableHeaders: Array<HeaderType> = [
    {
        value: 'Nama',
        sort: true
    },
    {
        value: 'Action',
        className: 'w-3 text-center',
    },
]
function Index({ token }: { token: unknown }) {
    const productionState = useAppSelector(selectState)
    const dispatch = useAppDispatch()

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')

    const tableColumns: Array<ColumnFormat> = [
        { value: 'name' },
        {
            render: (d) => {
                return '-'
            }
        },
    ];

    useEffect(() => {
        dispatch(getData({ token: token, limit: 5, offset: 0 }))
    }, [])
    return (
        <div>
            <MyCard>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-600 text-sm'>Data Production</p>
                    <MyButton onClick={() => { setModalOpen(true) }}>
                        <span className="material-symbols-outlined me-1 text-sm">
                            add_circle
                        </span>
                        <span className='text-sm'>Add Item</span>
                    </MyButton>
                </div>
                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                <MyTable
                    headers={tableHeaders}
                    data={productionState.data ? productionState.data : []}
                    column={tableColumns}
                    pageLength={[1, 2]}
                    onSorted={(d) => { }}
                />
            </MyCard>
            <MyModal isOpen={modalOpen} title='Modal Add Production' onClose={() => { setModalOpen(false) }}>
                <MyTextfield
                    disabled={isLoading}
                    type='text'
                    value={name}
                    onChange={(e, v) => { setName(v) }}
                    placeholder='Name'
                />
                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
                <div className='flex w-full justify-end'>
                    <MyButtonLoading onClick={() => { setIsLoading(true) }} isLoading={isLoading}>
                        <span className="material-symbols-outlined me-1 text-sm">
                            send
                        </span>
                        <span className='text-sm'>Save</span>
                    </MyButtonLoading>
                </div>
            </MyModal>
        </div>
    )
}

export default Index