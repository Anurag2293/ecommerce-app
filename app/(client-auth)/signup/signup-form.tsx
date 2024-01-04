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

const signupSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "Enter atleast 8 characters..."
    }),
    phone: z.string().min(10, {
        message: "Enter a valid phone number..."
    })
})

type Props = {
    searchParams: { message: string }
}

const SignupForm = () => {
    const router = useRouter()
    const supabase = createClient();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone: ""
        }
    })

    const checkSession = async () => {
        try {
            const session = await supabase.auth.getSession();
            if (session.data.session) {
                dispatch(logIn({ username: String(session.data.session?.user.email), uid: String(session.data.session?.user.id) }));
            } else {
                dispatch(logOut());
            }
        } catch (error: any) {
            alert(error.message);
        }
    }

    const onSubmit = async (values: z.infer<typeof signupSchema>) => {
        console.log("sign in client")
        try {
            const { first_name, last_name, email, password, phone } = values;
            const res = await fetch(`${origin}/api/auth/signup`, {
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
            const { error, response } = await res.json();
            if (error) {
                console.log({ error });
                throw new Error(error.message)
            }
            await checkSession();
            return router.push('/login?message=Enter Your Credentials to Login')
        } catch (error: any) {
            console.log(error);
            return router.replace(`/signup?message=${error.message || "Could not authenticate user"}`)
        }
    }

    return (
        <Card className="w-[350px] mt-24 md:mt-0">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Enter your details to sign up</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className='flex justify-between gap-x-4'>
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="John" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            Enter your first name
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Doe" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            Enter your last name
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email ID</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="johndoe@email.com" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Enter your email ID
                                    </FormDescription> */}
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
                                    {/* <FormDescription>
                                        Enter your password
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="+91 1234567890" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Enter your phone number
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="">
                <Button className="w-full" variant="outline" asChild>
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default SignupForm;