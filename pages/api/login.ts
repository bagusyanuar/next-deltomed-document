import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BaseURL, APIResponse } from '../../lib/api'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironSessionOptions } from '../../lib/session'

async function loginHandler(
    request: NextApiRequest,
    response: NextApiResponse<APIResponse>
) {
    const { username, password } = await request.body;
    const body = {
        username, password
    };
    try {
        let res = await axios.post(`${BaseURL}/sign-in`, JSON.stringify(body));
        if (res.status === 200) {
            let data = res.data;
            let token = data.data;
            request.session.token = token
            console.log(data);
            
            await request.session.save()
            console.log(request.session.token);
            
            response.status(200).json({ message: 'success', code: 200, data: data });
        } else {
            response.status(res.status).json({ message: 'failed', code: res.status, data: null })
        }
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

export default withIronSessionApiRoute(loginHandler, ironSessionOptions)