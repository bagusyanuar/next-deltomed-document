import { createAsyncThunk } from '@reduxjs/toolkit'
import { URLAdmin, APIResponse } from '../../../lib/api'

const path = '/production-step'

export type PostData = {
    productionID: string,
    name: string,
    indexOf: number
}

export const getData = createAsyncThunk('productionStep/getData', async ({
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

export const create = createAsyncThunk('productionStep/create', async ({
    token, data,
}: {
    token: unknown,
    data: PostData
}, { rejectWithValue }) => {
    try {
        URLAdmin.defaults.headers.common.Authorization = `Bearer ${token}`
        const response = await URLAdmin.post(path, data);
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