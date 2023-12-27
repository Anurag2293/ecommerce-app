import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { id, name } = await request.json();

        let response;
        if (!id) {
            response = await prisma.categories.create({
                data: { name }
            })
        } else {
            response = await prisma.categories.create({
                data: { id, name }
            })
        }
        
        return NextResponse.json({ error: undefined, response });
    } catch (error) {
        return NextResponse.json({ error, response: undefined });
    }
}