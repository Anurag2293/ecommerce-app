import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const params = request.nextUrl.searchParams;
        const take = params.get("take") || 12;
        const skip = params.get("skip") || 0;
        const categoryName = params.get("category");

        let products, totalProducts;
        if (categoryName) {
            const category = await prisma.categories.findFirst({where:{name: categoryName}});
            if (!category) {
                throw new Error("Category not available!");
            }
            const {id: category_id} = category;

            [products, totalProducts] = await Promise.all([
                prisma.products.findMany({ where: { category_id }, take: Number(take), skip: Number(skip)}),
                prisma.products.count({ where: { category_id }})
            ])
        } else {
            [products, totalProducts] = await Promise.all([
                prisma.products.findMany({take: Number(take), skip: Number(skip)}),
                prisma.products.count({})
            ])
        }
        return NextResponse.json({ error: undefined, response: products, totalProducts });
    } catch (error) {
        return NextResponse.json({ error, response: undefined });
    }
}