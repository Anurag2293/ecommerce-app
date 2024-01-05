import React from 'react'

// STATE
import type { products as ProductType } from '@prisma/client'

// COMPONENT
import CollectionMenu from '@/components/CategoriesMenu'
import SortMenu from '@/components/SortMenu'
import ProductCard from '@/components/ProductCard'

type Props = {}

const Search = async (props: Props) => {
    const res = await fetch('http://localhost:3000/api/products?take=12');
    const { error, response: products } = await res.json();
    console.log({ products })

    if (error) {
        return (<div>Error</div>)
    }

    return (
        <>
            {/* <div>Search</div> */}
            <CollectionMenu />
            <SortMenu />
            <div className='w-full flex justify-between px-4 py-0 md:px-6 md:py-0'>
                <div className='hidden md:block'>
                    Categories
                </div>
                <div className='w-full md:w-5/6 grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {products.map((product: ProductType) => (
                        <ProductCard product={product} />
                    ))}
                </div>
                <div className='hidden md:block'>
                    Sort by
                </div>
            </div>
        </>
    )
}

export default Search