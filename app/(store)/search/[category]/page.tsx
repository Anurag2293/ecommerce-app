import React, { Suspense } from 'react'
import prisma from "@/lib/db";
import type { products as ProductType } from '@prisma/client';

import { SEARCH_PRODUCTS_PER_PAGE, SITE_URL } from '@/lib/constants';
import SearchCard from '@/components/search/SearchCard';
import SearchCardLoading from '@/components/search/SearchCardLoading';

const getProductsByCategory = async (categoryName: string | null) => {
    try {
        let products, totalProducts;
        if (categoryName) {
            const category = await prisma.categories.findFirst({where:{name: categoryName}});
            if (!category) {
                throw new Error("Category not available!");
            }
            const {id: category_id} = category;

            [products, totalProducts] = await Promise.all([
                prisma.products.findMany({ where: { category_id }}),
                prisma.products.count({ where: { category_id }})
            ])
        } else {
            [products, totalProducts] = await Promise.all([
                prisma.products.findMany({}),
                prisma.products.count({})
            ])
        }
        return { error: undefined, response: products, totalProducts }; 
    } catch (error) {
        return { error, response: undefined, totalProducts: undefined };
    }
}

type Props = {
    params: { category: string }
}

const Category = async ({ params }: Props) => {
    const categoryName = params.category;
    const { error, response: products, totalProducts } = await getProductsByCategory(categoryName);

    if (error) {
        console.log(error);
        return (
            <div>There was error fetching ${categoryName} products, {SITE_URL}</div>
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
                <p className="my-2">Showing {totalProducts} search results</p>
                <div className='grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4 md:mb-8 lg:mb-12'>
                    {products && products.map((product: ProductType) => (
                        <SearchCard key={product.id} product={product} />
                    ))}
                </div>
            </Suspense>
        </>
    )
}

export default Category