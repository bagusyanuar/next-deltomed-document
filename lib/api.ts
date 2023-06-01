import axios from "axios";

export type APIResponse = {
    message: string,
    code: number,
    data?: any
}

export const BaseURL: string = 'http://localhost:8000'

export const URLAdmin = axios.create({
    baseURL: `${BaseURL}/api/admin`
})