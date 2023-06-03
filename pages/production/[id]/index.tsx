import Layout from '../../../components/layouts'
import DetailPage from '../../../components/pages/production/detail'

import { ironSessionOptions } from '../../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'
export default function ProductionByID({ token, id }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <DetailPage token={token} id={id?.toString()}/>
        </Layout>
    )
}

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
    params
}) {
    const token = req.session.token
    const id = params?.id
    
    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    return {
        props: { token, id },
    }
},
    ironSessionOptions)