import React, { Suspense } from 'react'
import type { products as ProductType } from '@prisma/client';

import { SEARCH_PRODUCTS_PER_PAGE } from '@/lib/contants';
import SearchCard from '@/components/search/SearchCard';
import SearchCardLoading from '@/components/search/SearchCardLoading';

async function getCategoryProducts(categoryName: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/search?category=${categoryName}`);
        const { error, response, totalProducts } = await res.json();
        return { error, products: response, totalProducts };
    } catch (error) {
        return { error };
    }
}

type Props = {
    params: { category: string }
}

const Category = async ({ params }: Props) => {
    const categoryName = params.category;
    const { error, products, totalProducts } = await getCategoryProducts(categoryName);

    if (error) {
        console.log(error);
        return (
            <div>There was error fetching ${categoryName} products, {process.env.NEXT_PUBLIC_URL}</div>
        )
    }

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
        </>
    )
}

export default Category