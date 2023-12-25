import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const products = await prisma.products.findMany({ take: 10 });
        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error });
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const products = await request.json();
        console.log(products);
        const response = await prisma.products.createMany({
            data: products || [],
            skipDuplicates: true
        })

        return NextResponse.json({ response });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}