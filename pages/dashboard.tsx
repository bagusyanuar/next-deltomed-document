import DashboardPage from '../components/pages/dashboard'
import Layout from '../components/layouts'

import { ironSessionOptions } from '../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'

export default function Dashboard({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <DashboardPage token={token}/>
        </Layout>

    )
}

export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
  }) {
    const token = req.session.token
    if (!token) {
      return {
        redirect: {
            destination: '/',
            permanent: true
        }
      }
    }
    let tok = token.toString();
    return {
      props: { token: tok },
    }
  },
    ironSessionOptions)