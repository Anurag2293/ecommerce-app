"use client"

// NODE MODULES
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// STATE
import type { products as ProductType } from '@prisma/client'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from "@/components/ui/toast"

// COMPONENT
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import SearchPagination from './SearchPagination'

const SearchCard = ({ product }: { product: ProductType }) => {
    return (
        <Card key={product.id} className="w-auto aspect-square group hover:cursor-pointer hover:border hover:border-primary">
            <Link href={`/search/${product.id}`}>
                <CardContent className="h-full flex relative justify-center items-center">
                    <Image
                        className="w-auto h-48 hover:h-56 group-hover:h-56 rounded-lg transition-all duration-300 ease-in-out"
                        src={product.thumbnail || ""}
                        alt={String(product.title)}
                        width={500}
                        height={500}
                    />
                    <div className="absolute left-4 bottom-4 lg:left-1 lg:bottom-2 xl:left-4 xl:bottom-4 bg-white dark:bg-black backdrop:blur-3xl">
                        <div className="w-auto border rounded-3xl p-1 pl-4 flex justify-between items-center gap-1 text-sm font-semibold">
                            <p className="xl:hidden">{product.title?.substring(0, 20)}</p>
                            <p className="hidden xl:block">{product.title}</p>
                            <Badge className="h-10 w-auto text-white">
                                {"$"}{" "}{String(product.price)}{" "}{"USD"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}

const LoadingCard = ({ id }: { id: number }) => {
    return (
        <Card key={id} className="w-auto aspect-square">
            <Skeleton className="h-full w-full rounded-b-lg" />
        </Card>
    )
}

type Props = {}

const SearchResults = (props: Props) => {
    const PRODUCTS_PER_PAGE = 12;
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/search?take=${PRODUCTS_PER_PAGE}&skip=${(currentPage - 1) * PRODUCTS_PER_PAGE}`);
                const { error, response: products, totalProducts: countProducts } = await res.json();
                console.log({ products })
                if (error) {
                    throw new Error(error)
                }
                setTotalProducts(countProducts)
                setProducts(products)
            } catch (error: any) {
                toast({
                    variant: "destructive",
                    title: "Error fetching Products",
                    description: error.message,
                    action: <ToastAction altText="Try again" onClick={fetchProducts}>Try again</ToastAction>,
                })
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [currentPage])

    return (
        <>
            <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {products.map((product: ProductType) => (
                    <SearchCard key={product.id} product={product} />
                ))}
                {loading && (Array.from({ length: 12 }).map((_, i) => (
                    <LoadingCard key={i} id={i} />
                )))}
            </div>
            <div className='w-full flex justify-center items-center my-8'>
                <SearchPagination
                    totalProducts={totalProducts}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productsPerPage={PRODUCTS_PER_PAGE}
                />
            </div>
        </>
    )
}

export default SearchResults;