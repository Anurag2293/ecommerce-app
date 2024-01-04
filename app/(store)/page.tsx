"use client"

import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function Index() {
	const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);
	const { toast } = useToast();

	return (
		<>
			<div>Ecommerce App</div>
			{/* <Button
				variant="outline"
				onClick={() => {
					toast({
						description: "Your message has been sent.",
					})
				}}
			>
				Show Toast
			</Button> */}
		</>
	)
}
