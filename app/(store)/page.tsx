"use client"

import Link from "next/link";
import { useAppSelector } from "@/redux/store";

export default function Index() {
	const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);

	return (
		<div>
			{isAuthenticated && (<h1>Good that you are logged in!</h1>)}
			<h1>Hello World!</h1>
			<Link href="/login">Sign In</Link>
			<Link className="block bg-slate-500" href="/signup">Sign Up</Link>
		</div>
	)
}
