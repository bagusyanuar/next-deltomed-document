import Layout from '../../components/layouts'
import UserPage from '../../components/pages/user'

import { ironSessionOptions } from '../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'


export default function User({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <UserPage token={token} />
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
