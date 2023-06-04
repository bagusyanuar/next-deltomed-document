import axios, { AxiosError } from "axios";

export type APIResponse = {
    message: string,
    code: number,
    data?: any
}

export const BaseURL: string = 'http://localhost:8000'

export const URLAdmin = axios.create({
    baseURL: `${BaseURL}/api/admin`
})

export const ErrorRespose = (error: any | AxiosError): APIResponse => {
    let code: number = 500
    let message: string = 'internal server error'
    let data: any = null
    if (axios.isAxiosError(error)) {
        code = error.status ? error.status : 500;
        if (error.response) {
            message = error.response.data.message
        }
    } else {
        message = `internal server error ${error.message}`
    }
    return { code, message, data }
} 
