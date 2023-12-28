"use client"

import { useEffect } from "react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/client";
import { useAppSelector, dispatch } from "@/redux/store";
import { logIn, logOut } from "@/redux/features/auth-slice";

export default function Index() {
	const supabase = createClient();
	const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);

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

	useEffect(() => {
		checkSession();
	}, [])

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log("Error signing out:", error.message);
		} else {
			await checkSession();
			console.log("Signed out!");
		}
	}

	return (
		<div>
			{isAuthenticated && (<h1>Good that you are logged in!</h1>)}
			<h1>Hello World!</h1>
			<Link href="/login">Sign In</Link>
			<Link className="block bg-slate-500" href="/signup">Sign Up</Link>
			<button className="block  bg-red-500 " onClick={handleSignout}>Sign Out</button>
		</div>
	)
}
