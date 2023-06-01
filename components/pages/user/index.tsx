import React, { useState, useEffect } from 'react'
import MyCard from '../../../components/card'
import MyModal from '../../../components/modal'
import MyButton from '../../../components/forms/button'
import MySelect from '../../../components/forms/select'
import MyTextFieldIcon from '../../../components/forms/textfield/with-icon/prefix'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectState, sort } from '../../../redux/features/user/slice'
import { getData } from '../../../redux/features/user/action'

function Index({ token }: { token: unknown }) {
    const userState = useAppSelector(selectState)
    const dispatch = useAppDispatch()

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const roleOptions: Array<any> = [
        {
            value: 'administrator',
            text: 'Administrator'
        },
        {
            value: 'manager',
            text: 'Manager'
        },
    ]

    useEffect(() => {
        console.log('effects');

        dispatch(getData({ token: token, limit: 5, offset: 0 }))
    }, [])

    const handleSave = () => {
        const data = {
            email, username, password, role
        }
        console.log(data);
        
    }
    return (
        <div>
            <MyCard>
                <div className='flex justify-between items-center'>
                    <p className='text-gray-600 text-sm'>Data User</p>
                    <MyButton onClick={() => { setModalOpen(true) }}>
                        <span className="material-symbols-outlined me-1 text-sm">
                            add_circle
                        </span>
                        <span className='text-sm'>Add Item</span>
                    </MyButton>
                </div>

                <div className='border-b border-gray-300 w-full mt-3 mb-3'></div>
            </MyCard>
            <MyModal isOpen={modalOpen} title='Modal Add User' onClose={() => { setModalOpen(false) }}>
                <MyTextFieldIcon
                    icon='mail'
                    type='text'
                    onChange={(e, v) => { setEmail(v) }}
                    name="email"
                    id="email"
                    placeholder="email"
                    value={email}
                    className='mb-3'
                />
                <MyTextFieldIcon
                    icon='person'
                    type='text'
                    onChange={(e, v) => { setUsername(v) }}
                    name="username"
                    id="username"
                    placeholder="username"
                    value={username}
                    className='mb-3'
                />
                <MyTextFieldIcon
                    icon='lock'
                    type='password'
                    onChange={(e, v) => { setPassword(v) }}
                    name="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    className='mb-3'
                />
                <MySelect
                    icon='loyalty'
                    data={roleOptions}
                    id='role'
                    name='roles'
                    placeholder='--choose role--'
                    onSelect={(v) => { setRole(v) }}
                    className='mb-3'
                />
                <div className='flex w-full justify-end'>
                    <MyButton onClick={() => { handleSave() }}>
                        <span className="material-symbols-outlined me-1 text-sm">
                            check
                        </span>
                        <span className='text-sm'>Save</span>
                    </MyButton>
                </div>
            </MyModal>
        </div>
    )
}

export default Index