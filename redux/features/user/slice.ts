import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

type UserState = {
    type: string,
    isLoading: boolean,
    data: Array<any> | null,
    error: boolean,
    success: boolean,
    message: string
}

const initialState: UserState = {
    type: 'FETCH',
    isLoading: false,
    data: null,
    error: false,
    success: false,
    message: ''

}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sort: (state) => {
            state.error = true
        }
    }
})

export const { sort } = slice.actions

export const selectState = (state: RootState) => state.user

export default slice.reducer