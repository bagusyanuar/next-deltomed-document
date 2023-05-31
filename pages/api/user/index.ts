import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BaseURL, APIResponse } from '../../../lib/api'

async function userHandler(
    request: NextApiRequest,
    response: NextApiResponse<APIResponse>
) {
    try {
        const { limit, offset } = request.query
        const res = await axios.get(`${BaseURL}/user?limit=${limit}&offset=${offset}`);
        const data = res.data as APIResponse
        console.log(res);
        response.status(200).json(data);
    } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
            const errorStatus: number = error.status ? error.status : 500;
            let errorMessage = 'internal server error'
            if (error.response) {
                errorMessage = error.response.data.message
            }
            response.status(errorStatus).json({ message: errorMessage, code: errorStatus })
        } else {
            response.status(500).json({ message: 'internal server error ' + error.message, code: 500 })
        }
    }
}

export default userHandler