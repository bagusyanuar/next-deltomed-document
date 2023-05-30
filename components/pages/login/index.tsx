import React, { useState } from 'react'
import { useRouter } from 'next/router'
import TextfieldPrefixIcon from '../../forms/textfield/with-icon/prefix'
import MyButton from '../../forms/button'
import axios from 'axios'

function Index() {
    const router = useRouter()
    const [username, setUsername] = useState<string | undefined>('')
    const [password, setPassword] = useState<string | undefined>('')

    const loginHandler = async () => {
        const data = {
            username, password
        }
        let res = await axios.post('/api/login', data)
        console.log(res);
    }

    return (
        <main className='h-screen bg-green-600 flex justify-center items-center'>
            <div className='sm:w-1/3 md:w-1/5 bg-slate-50 rounded-md px-5 py-5 shadow-lg'>
                <div className='flex items-center justify-center mb-6'>
                    {/* <Image src="/assets/logo.png" width={30} height={10} alt="logo" /> */}
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
                        <MyButton onClick={() => { loginHandler() }}>
                            <span>Login</span>
                        </MyButton>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Index