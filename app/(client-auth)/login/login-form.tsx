"use client"

// NODE MODULES 
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// STATE
import { createClient } from "@/utils/supabase/client";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

// COMPONENT
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Enter atleast 8 characters..."
    })
})

type Props = {
    searchParams: { message: string }
}

const LoginForm = () => {
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

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        console.log("sign in client")
		try {
            const { email, password } = values;
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
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your details to sign in</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe@email.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your email ID
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="••••••••••••••" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your password
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Login</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="">
                <Button className="w-full" variant="outline" asChild>
                    <Link href="/signup">
                        Signup
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default LoginForm;