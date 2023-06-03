import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { getData, create, getDataByID } from './action'

type ProductionState = {
    type: string,
    isLoading: boolean,
    data: any,
    error: boolean,
    success: boolean,
    message: string
}

const initialState: ProductionState = {
    type: 'FETCH',
    isLoading: false,
    data: null,
    error: false,
    success: false,
    message: ''
}

const slice = createSlice({
    name: 'production',
    initialState,
    reducers: {
        sort: (state, { payload }) => {
            state.data = payload
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
        }).addCase(getDataByID.pending, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = true
            state.error = false
            state.success = false
        }).addCase(getDataByID.fulfilled, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = false
            state.error = false
            state.success = true
            state.data = action.payload.data
        }).addCase(getDataByID.rejected, (state, action) => {
            state.type = 'FETCH'
            state.isLoading = false
            state.success = false
            state.error = true
            state.data = []
        }).addCase(create.pending, (state, action) => {
            state.type = 'CREATE'
            state.isLoading = true;
            state.error = false
            state.success = false
        }).addCase(create.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false
            state.success = true
        }).addCase(create.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true
            state.success = false
        })
    }
})

export const { sort } = slice.actions
export const selectState = (state: RootState) => state.production
export default slice.reducer