"use client"

// NODE MODULES
import React, { useState, useEffect } from "react"
import Link from "next/link"
import type { categories as CategoriesType } from "@prisma/client"
import { usePathname } from "next/navigation"
import { useRouter } from 'next/navigation'

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

const MobileCategoriesMenu = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [categories, setCategories] = useState<CategoriesType[]>([{ id: 0, name: "All" }]);
    const pathname = usePathname();
    const categoriesPathArray = pathname.split("/");
    categoriesPathArray.push("All");

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                setCategories([]);
                const res = await fetch("/api/categories");
                const { error, response: categoryList } = await res.json();
                if (error) {
                    throw new Error(error);
                }
                categoryList.unshift({ id: 0, name: "All" });
                setCategories(categoryList)
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

    const selectItemSubmit = (category: string) => {
        console.log({category})
        router.push(`/search/${category}`);
    }

    return (
        <div className="px-4 w-full md:hidden">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem 
                        value="All"
                        onClick={() => selectItemSubmit("")}
                    >
                        All
                    </SelectItem>
                    <SelectItem 
                        value="smartphones"
                        onClick={() => selectItemSubmit("smartphones")}
                    >
                        Smartphones
                    </SelectItem>
                    <SelectItem 
                        value="laptops"
                        onClick={() => selectItemSubmit("laptops")}
                    >
                        Laptop
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default MobileCategoriesMenu;