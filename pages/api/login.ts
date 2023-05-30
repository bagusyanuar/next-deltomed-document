import axios, { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string,
    code: number,
    data?: any
}
export default async function loginHandler(
    request: NextApiRequest,
    response: NextApiResponse<Data>
) {
    const { username, password, asd } = await request.body;
    const body = {
        username, password, asd
    };
    try {
        let d = asd['abc'];
        let res = await axios.post('http://localhost:8000/api/admin/sign-in', JSON.stringify(body));
        if (res.status === 200) {
            let data = res.data.ad;
            // let token = data.data;
            // req.session.token = token;
            // await req.session.save();
            // console.log(req.session);
            response.status(200).json({ message: 'success', code: 200, data: data });
        } else {
            response.status(res.status).json({ message: 'failed', code: res.status, data: null })
        }
    } catch (error: any) {
        
        
        if (axios.isAxiosError(error)) {
            response.status(500).json({ message: 'failed ' + error.response?.data.message, code: 500 })
            console.log(error.response?.data);
        } else {
            response.status(500).json({ message: error.message, code: 500 })
        }
        
    }
}