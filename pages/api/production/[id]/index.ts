import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { URLAdmin, APIResponse } from '../../../../lib/api'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../../../lib/session'

const handler = async (request: NextApiRequest, response: NextApiResponse<APIResponse>) => {
    try {
        const { id } = request.query
        const axiosResponse = await URLAdmin.get(`/production/${id}`);
        const data = axiosResponse.data as APIResponse
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

export default withIronSessionApiRoute(handler, ironSessionOptions)