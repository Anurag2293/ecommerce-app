import React from 'react'
import type { products as ProductType } from '@prisma/client';

async function getCategoryProducts(categoryName: string) {
    try {
        const res = await fetch(`http://localhost:3000/api/search?category=${categoryName}`);
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
            <div>There was error fetching ${categoryName} products, {process.env.NEXT_PUBLIC_VERCEL_URL}</div>
        )
    }

    return (
        <>
            <div>Category: {params.category}</div>
            {products.map((product: ProductType) => (<div>{product.title}</div>))}
            {process.env.NEXT_PUBLIC_URL}
        </>
    )
}

export default Category