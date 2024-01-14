"use client"

// NODE MODULES
import React, { useState, useEffect, Suspense } from 'react'

// STATE
import type { products as ProductType } from '@prisma/client'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from "@/components/ui/toast"
import { SEARCH_PRODUCTS_PER_PAGE } from '@/lib/contants'

// COMPONENT
import SearchPagination from './SearchPagination'
import SearchCard from './SearchCard'
import SearchCardLoading from './SearchCardLoading'

type Props = {}

const SearchResults = (props: Props) => {
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [products, setProducts] = useState<ProductType[]>([])
    const { toast } = useToast()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/search?take=${SEARCH_PRODUCTS_PER_PAGE}&skip=${(currentPage - 1) * SEARCH_PRODUCTS_PER_PAGE}`);
                const { error, response: products, totalProducts: countProducts } = await res.json();

                // console.log({ products })
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
            }
        }

        fetchProducts()
    }, [currentPage])

    return (
        <>
            <Suspense
                fallback={<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({length: SEARCH_PRODUCTS_PER_PAGE}).map((_, i) => (
                        <SearchCardLoading key={i} id={i} />
                    ))}
                </div>}
            >
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {products.map((product: ProductType) => (
                        <SearchCard key={product.id} product={product} />
                    ))}
                </div>
            </Suspense>
            <div className='w-full flex justify-center items-center my-8'>
                <SearchPagination
                    totalProducts={totalProducts}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    productsPerPage={SEARCH_PRODUCTS_PER_PAGE}
                />
            </div>
        </>
    )
}

export default SearchResults;