import LoginPage from '../components/pages/login'
import { ironSessionOptions } from '../lib/session'
import { withIronSessionSsr } from 'iron-session/next'
import { InferGetServerSidePropsType } from 'next'
export default function Home({ }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LoginPage />
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const token = req.session.token
  if (token) {
    return {
      redirect: {
          destination: '/dashboard',
          permanent: true
      }
    }
  }
  return {
    props: { },
  }
},
  ironSessionOptions)
