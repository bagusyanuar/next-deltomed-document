import React, { useState } from 'react'
import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TextfieldPrefixIcon from '../../forms/textfield/with-icon/prefix'
import MyButtonLoading from '../../forms/button/with-loading'
import MyAlert, { AlertTypes } from '../../modal/alert'
import axios, { AxiosError } from 'axios'
import { ironSessionOptions } from '../../../lib/session'
import { withIronSessionSsr } from 'iron-session/next'

export default function Index({ token }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(token);
    
    const router = useRouter()
    const [username, setUsername] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [modalShow, setModalShow] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('')
    const [alertType, setAlertType] = useState<AlertTypes>(AlertTypes.success)

    const loginHandler = async () => {
        try {
            setIsLoading(true)
            const data = {
                username, password
            }
            const response = await axios.post('/api/login', data)
            router.push('/dashboard')
            // setAlertMessage('success')
            // setAlertType(AlertTypes.success)
            // console.log(response);
        } catch (error: any | AxiosError) {
            setAlertMessage(error.response?.data.message)
            setAlertType(AlertTypes.error)
            setModalShow(true)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <main className='h-screen bg-green-600 flex justify-center items-center'>
            <div className='sm:w-1/3 md:w-1/5 bg-slate-50 rounded-md px-5 py-5 shadow-lg'>
                <div className='flex items-center justify-center mb-6'>
                    <Image src="/assets/logo.png" width={30} height={10} alt="logo" />
                    <p className='font-bold ms-1 text-slate-900'>My Company</p>
                </div>
                <div id='form'>
                    <TextfieldPrefixIcon
                        icon='person'
                        type='text'
                        onChange={(e, v) => { setUsername(v) }}
                        name="username"
                        id="username"
                        placeholder="username"
                        value={username}
                        className='mb-3'
                    />
                    <TextfieldPrefixIcon
                        icon='lock'
                        type='password'
                        onChange={(e, v) => { setPassword(v) }}
                        name="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        className='mb-3'
                    />
                    <div className='flex justify-end'>
                        <MyButtonLoading isLoading={isLoading} onClick={() => { loginHandler() }}>
                            <span>Login</span>
                        </MyButtonLoading>
                    </div>
                </div>
            </div>
            <MyAlert isOpen={modalShow} callback={() => { setModalShow(false); }} type={alertType} message={alertMessage} />
        </main>
    )
}


export const getServerSideProps = withIronSessionSsr(async function ({
    req,
    res,
  }) {
    const token = req.session.token
    console.log(token);
    return {
      props: { token },
    }
  },
  ironSessionOptions)