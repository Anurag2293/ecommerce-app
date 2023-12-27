"use client"

import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function Signup({
    searchParams,
}: {
    searchParams: { message: string }
}) {

    const signUpClient = async (formData: FormData) => {
        const first_name = formData.get('first_name') as string
        const last_name = formData.get('last_name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const phone = formData.get('phone') as string

        const res = await fetch(`${origin}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
                phone,
                origin: "http://localhost:3000"
            }),
        })
        const { error, response } = await res.json()

        if (error) {
            return redirect(`/login?message=${error.message}`)
        }

        console.log({ response })
        
        return redirect('/login?message=Enter Your Credentials to Login')
    }

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{' '}
                Back
            </Link>

            <form
                className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action={signUpClient}
            >
                <label className="text-md" htmlFor="first_name">
                    First Name
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-4"
                    name="first_name"
                    type="text"
                    placeholder="John"
                    required
                />
                <label className="text-md" htmlFor="last_name">
                    Last Name
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-4"
                    name="last_name"
                    type="text"
                    placeholder="Doe"
                    required
                />
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-4"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-4"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <label className="text-md" htmlFor="phone">
                    Phone
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-4"
                    type="tel"
                    name="phone"
                    placeholder="+91 1234567890"
                    required
                />
                <button
                    formAction={signUpClient}
                    className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                >
                    Sign Up
                </button>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </div>
    )
}

/*
    // const signUp = async (formData: FormData) => {
    //     'use server'

    //     const origin = headers().get('origin')
    //     console.log({ origin })
    //     const email = formData.get('email') as string
    //     const password = formData.get('password') as string
    //     const phone = formData.get('phone') as string
    //     const cookieStore = cookies()
    //     const supabase = createClient(cookieStore)

    //     const { error } = await supabase.auth.signUp({
    //         email,
    //         password,
    //         phone,
    //         options: {
    //             emailRedirectTo: `${origin}/auth/callback`,
    //         },
    //     })

    //     if (error) {
    //         // console.log({ error: error.message})
    //         // return redirect(`/login?message=Could not authenticate user`)
    //         return redirect(`/login?message=${error.message}`)
    //     }

    //     return redirect('/login?message=Enter Your Credentials to Login')
    // }
*/