import Layout from '../../components/layouts'
import ProductionPage from '../../components/pages/production'

import { ironSessionOptions } from '../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'

export default function Production({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout>
            <ProductionPage token={token}/>
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
    return {
      props: { token },
    }
  },
    ironSessionOptions)
