import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { getData } from './action'

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
    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = true
            state.error = false
            state.success = false
        }).addCase(getData.fulfilled, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = false
            state.error = false
            state.success = true
            state.data = action.payload.data
        }).addCase(getData.rejected, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = false
            state.success = false
            state.error = true
            state.data = []
        })
    }
})

export const { sort } = slice.actions

export const selectState = (state: RootState) => state.user

export default slice.reducer