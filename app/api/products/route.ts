import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try { 
        const params = request.nextUrl.searchParams;
        const take = params.get('take') || 10;
        const skip = params.get('skip') || 0;
        const products = await prisma.products.findMany({ take: Number(take), skip: Number(skip) });
        return NextResponse.json({ error: undefined, response: products });
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
        return NextResponse.json({ error: undefined, response });
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
        return NextResponse.json({ error: undefined, response: updatedProduct });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, response: undefined });
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id } = await request.json();
        const deletedProduct = await prisma.products.delete({ where: { id } });
        return NextResponse.json({ error: undefined, response: deletedProduct });
    } catch (error) {
        return NextResponse.json({ error, response: undefined });
    }
}