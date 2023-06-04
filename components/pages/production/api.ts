import { NextApiResponse } from 'next'
import { APIResponse, URLAdmin, ErrorRespose } from '../../../lib/api'
import axios, { AxiosError, } from "axios";

const path = '/production'
export const getProductionByID = async (token: unknown, id: string | undefined) => {
    URLAdmin.defaults.headers.common.Authorization = `Bearer ${token}`
    return await URLAdmin.get(`${path}/${id}`);
}