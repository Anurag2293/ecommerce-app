"use client"

import Link from 'next/link'

import { useAppSelector } from "@/redux/store";
import { LoginButton, MobileMenu } from './Buttons';
import Cart from './Cart'
import NavInput from './NavInput'
import Profile from './Profile';

const NAV_MENU = [
    { title: "All", link: "/search" }, 
    { title: "Shirts", link: "/search/shirts" },
    { title: "Stickers", link: "/search/stickers"}
] as const;

const Nav = () => {
    const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);

    return (
        <nav className='relative flex items-center justify-between p-4 lg:px-6'>
            <div className="block flex-none md:hidden">
                <MobileMenu />
            </div>
            <div className='flex w-full items-center'>
                <div className='flex w-full md:w-1/3'>
                    <Link
                        href="/"
                        className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
                    >
                        <div className='flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-border dark:bg-background h-[40px] w-[40px] rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Swift Kart logo" viewBox="0 0 32 28" className="h-4 w-4 fill-primary dark:fill-primary"><path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path><path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path></svg>
                        </div>
                        <div className='ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block dark:text-white'>
                            Swift Kart
                        </div>
                    </Link>
                    <ul className='hidden gap-6 text-sm md:flex md:items-center'>
                        {NAV_MENU.map(({title, link}) => (
                            <li key={title}>
                                <Link 
                                    href={link}
                                    className='text-neutral-500 underline-offset-4 hover:text-primary hover:underline dark:text-neutral-400 dark:hover:text-primary'
                                >
                                    {title}                    
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='hidden justify-center md:flex md:w-1/3'>
                    <NavInput />
                </div>
                <div className='flex justify-end md:w-1/3 gap-4'>
                    {isAuthenticated && <Cart />}
                    {isAuthenticated && <Profile />}
                    {!isAuthenticated && <LoginButton /> }
                </div>
            </div>
        </nav>
    )
}

export default Nav