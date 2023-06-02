'use client'
import React from 'react'
import Sidebar from '../navigation/sidebar'
import SidebarItem from '../navigation/sidebar/item'
import Navbar from '../navigation/navbar'
import Content from './content'
import { useRouter } from 'next/router'

function Index({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const path = router.pathname;
    console.log(path);
    return (
        <div>
            <Sidebar>
                <div className='md:flex md:items-center md:mt-3 md:mb-10 sm:mb-10 sm:flex sm:justify-center'>
                    {/* <Image src="/assets/logo.png" width={30} height={10} alt="logo" /> */}
                    <p className='font-bold ms-2 sm:hidden md:hidden lg:block block'>Company Name</p>
                </div>
                <SidebarItem icon="dashboard" title="Dashboard" link="/dashboard" active={path === '/dashboard' ? true : false} />
                <SidebarItem icon="person" title="User" link="/user" active={path === '/user' ? true : false} />
                <SidebarItem icon="precision_manufacturing" title="Production" link="/production" active={path === '/production' ? true : false} />
            </Sidebar>
            <Content>
                <Navbar title={`Dashboard`} username={`abc`} />
                <div className='px-5 md:px-5 lg:px-5 sm:px-3 py-3 md:py-3 lg:py-3 sm:py-2'>
                    {children}
                </div>
            </Content>
        </div>
    )
}

export default Index