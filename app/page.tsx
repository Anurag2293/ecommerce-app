"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export default function Index() {
	const supabase = createClient();
	const [isLogged, setIsLogged] = useState(false);

	const checkSession = async () => {
		const session = await supabase.auth.getSession();
		console.log({ session: session.data.session });
		setIsLogged(session.data.session !== null ? true : false);
	}

	useEffect(() => {
		checkSession();
	}, [])

	const handleSignout = async () => {
		console.log("signing out")
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log("Error signing out:", error.message);
		} else {
			checkSession();
			console.log("Signed out!");
		}
	}

	return (
		<div>
			{isLogged && (<h1>Good that you are logged in!</h1>)}
			<h1>Hello World!</h1>
			<Link href="/login">Sign In</Link>
			<Link className="block bg-slate-500" href="/signup">Sign Up</Link>
			<button className="block  bg-red-500 " onClick={handleSignout}>Sign Out</button>
		</div>
	)
}
