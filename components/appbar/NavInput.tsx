"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "../ui/input"

const navInputSchema = z.object({
    searchQuery: z.string().min(1, {
        message: "Enter something to search..."
    })
})

const NavInput = () => {
    const form = useForm<z.infer<typeof navInputSchema>>({
        resolver: zodResolver(navInputSchema),
        defaultValues: {
            searchQuery: "",
        }
    })

    const onSubmit = (values: z.infer<typeof navInputSchema>) => {
        console.log({ values });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
            >
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Search for products..."
                                    className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        aria-hidden="true" 
                        className="h-4"
                    >
                        <path 
                            strokeLinejoin="round" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </div>
            </form>
        </Form>
    )
}

export default NavInput