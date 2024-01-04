"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createClient } from "@/utils/supabase/client";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

export default function Login({
	searchParams,
}: {
	searchParams: { message: string }
}) {
	const router = useRouter()
	const supabase = createClient();
	const dispatch = useAppDispatch();

	const checkSession = async () => {
		try {
			const session = await supabase.auth.getSession();
			if (session.data.session) {
				dispatch(logIn({username: String(session.data.session?.user.email), uid: String(session.data.session?.user.id) }));
			} else {
				dispatch(logOut());
			}
		} catch (error: any) {
			alert(error.message);
		}
	}

	const signInClient = async (formData: FormData) => {
		console.log("sign in client")
		try {
			const email = formData.get('email') as string
			const password = formData.get('password') as string

			const res = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			})
			const { error, response } = await res.json()

			console.log({ error, response })

			if (error) {
				console.log(error);
				throw new Error(error.message)
			}

			await checkSession();

			return router.replace('/')
		} catch (error: any) {
			console.log(error);
			return router.push(`/login?message=${error.message}`)
		}
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
				action={signInClient}
			>
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					name="email"
					placeholder="you@example.com"
					required
				/>
				<label className="text-md" htmlFor="password">
					Password
				</label>
				<input
					className="rounded-md px-4 py-2 bg-inherit border mb-6"
					type="password"
					name="password"
					placeholder="••••••••"
					required
				/>
				<button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
					Sign In
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
const signIn = async (formData: FormData) => {
	'use server'

	const email = formData.get('email') as string
	const password = formData.get('password') as string
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	})

	if (error) {
		return redirect('/login?message=Could not authenticate user')
	}

	return redirect('/')
}
*/