export type APIResponse = {
    message: string,
    code: number,
    data?: any
}

export const BaseURL: string = 'http://localhost:8000/api/admin'