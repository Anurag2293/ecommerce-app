
import Link from "next/link";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export const LoginButton = () => {
    return (
        <Button asChild>
            <Link href="/login">
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
            </Link>
        </Button>
    )
}

export const MobileMenu = () => {
    return (
        <Button
            aria-label='Open mobile menu'
            className='flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors bg-background dark:border-neutral-700 dark:bg-background dark:text-white md:hidden'
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                aria-hidden="true" 
                className="h-4"
            >
                <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
            </svg>
        </Button>
    )
}