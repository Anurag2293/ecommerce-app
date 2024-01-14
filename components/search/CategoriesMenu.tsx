"use client"

// NODE MODULES
import React, { useState, useEffect } from "react"
import Link from "next/link"
import type { categories as CategoriesType } from "@prisma/client"
import { usePathname } from "next/navigation"

// STATE
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

// COMPONENT
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Label } from "../ui/label"

const CategoriesMenu = () => {
    const pathname = usePathname()
    const { toast } = useToast();
    const [categories, setCategories] = useState<CategoriesType[]>([{ id: 0, name: "All" }]);

    useEffect(() => {
        const fetchCollection = async () => {
            try {
                // setCategories([]);
                const res = await fetch("/api/categories");
                const { error, response: categoryList } = await res.json();
                if (error) {
                    throw new Error(error);
                }
                categoryList.unshift({ id: 0, name: "All" });
                setCategories(categoryList);
                // console.log({ categoryList })
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
        console.log({ pathname })
    }, [pathname]);

    return (
        <ScrollArea className="h-96 rounded-md border-none">
            <div className="">
                <Label className="mb-4 block text-sm text-gray-400 font-medium leading-none">Categories</Label>
                {categories.map((category) => {
                    const categoriesArray = pathname.split("/");
                    if (categoriesArray.length === 2) {
                        categoriesArray.push("All");
                    }

                    // console.log({currentCategoryPathname})
                    category.name = String(category.name)
                    const categoryName = category.name.replace(/-/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
                    return (
                        <div key={category.id}>
                            <Link 
                                href={`/search/${category.name === "All" ? "": category.name}`} 
                                className={`text-sm underline-offset-4 hover:underline ${categoriesArray[2] === category.name ? 'underline' : ''}`}
                            >
                                {categoryName}
                            </Link>
                            <Separator className="my-2" />
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    )
}

export default CategoriesMenu;