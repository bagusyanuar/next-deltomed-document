import { createAsyncThunk } from '@reduxjs/toolkit'
import { URLAdmin, APIResponse } from '../../../lib/api'

const path = '/user'


export const getData = createAsyncThunk('user/getData', async ({
    token,
    limit,
    offset
}: {
    token: unknown,
    limit: number,
    offset: number
}, { rejectWithValue }) => {
    try {
        URLAdmin.defaults.headers.common.Authorization = `Bearer ${token}`
        const response = await URLAdmin.get(`${path}?limit=${limit}&offset=${offset}`);
        return response.data
    } catch (error: any) {
        return rejectWithValue({
            code: 500,
            message: 'error',
            data: {
                message: error.response ? error.message : error.response.data.message
            }
        })
    }
})