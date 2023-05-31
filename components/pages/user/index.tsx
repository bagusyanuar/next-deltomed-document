import React from 'react'
import MyCard from '../../../components/card'
import MyButton from '../../../components/forms/button'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectState, sort } from '../../../redux/features/user/slice'

function Index() {
    const userState = useAppSelector(selectState)
    const dispatch = useAppDispatch()

    const eventSort = () => {
        dispatch(sort())
    }
    
    
    return (
        <div>
            <MyCard>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-600 text-sm'>Data User</p>
                    <MyButton onClick={() => { eventSort() }}>
                        <span className="material-symbols-outlined me-1 text-sm">
                            add_circle
                        </span>
                        <span className='text-sm'>Add Item</span>
                    </MyButton>
                </div>

                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
            </MyCard>
        </div>
    )
}

export default Index