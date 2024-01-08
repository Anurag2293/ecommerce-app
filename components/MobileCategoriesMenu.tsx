"use client"

// NODE MODULES
import React, { useState, useEffect } from "react"
import Link from "next/link"
import type { categories as CategoriesType } from "@prisma/client"

// STATE
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

// COMPONENT
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const MobileCategoriesMenu = () =>{
    const { toast } = useToast();
    const [categories, setCategories] = useState<CategoriesType[]>([{id: 0, name: "All"}]);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                setCategories([]);
                const res = await fetch("/api/categories");
                const { error, response } = await res.json();
                if (error) throw new Error(error);
                const all = { id: 0, name: "All" };
                response.unshift(all);
                setCategories(response);
                console.log({ response })
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Couldn't fetch categories",
                    description: error.message,
                    action: <ToastAction altText="Try again" onClick={fetchCollection}>Try again</ToastAction>,
                })
            }
        }
        fetchCollection();
    }, []);

    return (
        <div className="px-4 w-full md:hidden">
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="all">
                            <Link href={`/search`}>
                                All
                            </Link>
                        </SelectItem>
                        {categories.map((category) => {
                            // convert category.name to Capitalize and replace - with space
                            category.name = String(category.name)
                            const categoryName = category.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
                            return (<SelectItem key={category.id} value={String(category.id)}>
                                <Link href={`/search/${category.name}`} className="underline">
                                    {categoryName}
                                </Link>
                            </SelectItem>)
                        })}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default MobileCategoriesMenu;