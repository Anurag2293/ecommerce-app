"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// STATE
import type { products as ProductType } from '@prisma/client'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from "@/components/ui/toast"

// COMPONENT
import CollectionMenu from '@/components/CategoriesMenu'
import SortMenu from '@/components/SortMenu'
import ProductCard from '@/components/ProductCard'
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingCard = ({ id }: {id: number}) => {
    return (
        <Card key={id} className="w-auto aspect-square">
            <Skeleton className="h-full w-full rounded-b-lg" />
        </Card>
    )
}

type Props = {}

const Search = (props: Props) => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const { toast } = useToast()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const res = await fetch('/api/products?take=12');
                const { error, response: products } = await res.json();
                console.log({ products })

                if (error) {
                    throw new Error(error)
                }

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
    }, [])

    return (
        <>
            <CollectionMenu />
            <SortMenu />
            <div className='w-full flex justify-between px-4 py-0 md:px-6 md:py-0'>
                <div className='hidden md:block'>
                    Categories
                </div>
                <div className='w-full md:w-5/6 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {products.map((product: ProductType) => (
                        <ProductCard product={product} loading={loading} />
                    ))}

                    {loading && (
                        Array.from({ length: 12 }).map((_, i) => (
                            <LoadingCard id={i} />
                        ))
                    )}
                </div>
                <div className='hidden md:block'>
                    Sort by
                </div>
            </div>
        </>
    )
}

export default Search