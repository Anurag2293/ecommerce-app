import React from 'react'
import Link from 'next/link'

import { Input } from './ui/input'
import { Button } from './ui/button'
import Cart from './Cart'
import NavInput from './NavInput'

type Props = {}

const NAV_MENU = [
    { title: "All", link: "/search" }, 
    { title: "Shirts", link: "/search/shirts" },
    { title: "Stickers", link: "/search/stickers"}
]

const Nav = (props: Props) => {
    return (
        <nav className='relative flex items-center justify-between p-4 lg:px-6'>
            <div className="block flex-none md:hidden">
                <Button
                    aria-label='Open mobile menu'
                    className='flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white md:hidden'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>
                </Button>
            </div>
            <div className='flex w-full items-center'>
                <div className='flex w-full md:w-1/3'>
                    <Link
                        href="/"
                        className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
                    >
                        <div className='flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-border dark:bg-border h-[40px] w-[40px] rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Swift Kart logo" viewBox="0 0 32 28" className="h-4 w-4 fill-black dark:fill-white"><path d="M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z"></path><path d="M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z"></path></svg>
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
                                    className='text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
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
                <div className='flex justify-end md:w-1/3'>
                    <Cart />
                </div>
            </div>
        </nav>
    )
}

export default Nav