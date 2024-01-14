import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 10;

export const GET = async (request: NextRequest) => {
    try { 
        const params = request.nextUrl.searchParams;
        const take = params.get('take') || 12;
        const skip = params.get('skip') || 0;

        const [products, aggregations] = await Promise.all([
            prisma.products.findMany({ take: Number(take), skip: Number(skip)}),
            prisma.products.aggregate({ _count: { id: true }})
        ]);
    
        return NextResponse.json({ error: undefined, response: products, totalProducts: aggregations._count.id });
    } catch (error) {
        return NextResponse.json({ error, response: undefined });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const products = await request.json();
        const response = await prisma.products.createMany({
            data: products || [],
            skipDuplicates: true
        });
        const aggregations = await prisma.products.aggregate({
            _count: {
                id: true
            }
        })
        return NextResponse.json({ error: undefined, response, totalProducts: aggregations._count.id });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, response: undefined });
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const productBody = await request.json();
        const { id } = productBody;
        const originalProduct = await prisma.products.findUnique({ where: { id } });
        const updatedProduct = await prisma.products.update({
            where: { id },
            data: { ...originalProduct, ...productBody }
        });
        const aggregations = await prisma.products.aggregate({
            _count: {
                id: true
            }
        })
        return NextResponse.json({ error: undefined, response: updatedProduct, totalProducts: aggregations._count.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, response: undefined });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedProduct = await prisma.products.delete({ where: { id } });
        const aggregations = await prisma.products.aggregate({
            _count: {
                id: true
            }
        })
        return NextResponse.json({ error: undefined, response: deletedProduct, totalProducts: aggregations._count.id });
    } catch (error) {
        return NextResponse.json({ error, response: undefined });
    }
}