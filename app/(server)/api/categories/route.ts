import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const params = request.nextUrl.searchParams;
        const id = params.get("id")
        const categoryName = params.get("category-name");

        let response;
        if (id) {
            response = await prisma.categories.findUniqueOrThrow({
                where: {
                    id: Number(id)
                }
            })
        } else if (categoryName) {
            response = await prisma.categories.findUniqueOrThrow({
                where: {
                    name: categoryName
                }
            })
        } else {
            response = await prisma.categories.findMany({})
        }
        return NextResponse.json({error: undefined, response})
    } catch (error) {
        return NextResponse.json({error, response: undefined})
    }
}

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

export const PUT = async (request: NextRequest) => {
    try {
        const { id, name, updated_name } = await request.json();
        
        let response;
        if (id) {
            response = await prisma.categories.update({
                where: {
                    id
                },
                data: {
                    id,
                    name: updated_name
                }
            })
        } else if (name) {
            response = await prisma.categories.update({
                where: {
                    name
                },
                data: {
                    name: updated_name
                }
            })
        } else {
            throw new Error("No id or name provided!")
        }
        return NextResponse.json({error: undefined, response})
    } catch (error) {
        return NextResponse.json({error, response: undefined})
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { id, name } = await request.json()

        let response;
        if (id) {
            response = await prisma.categories.delete({
                where: {
                    id
                }
            })
        } else if (name) {
            response = await prisma.categories.deleteMany({
                where: {
                    name
                }
            })
        } else {
            throw new Error("No id or name provided!")
        }
        return NextResponse.json({error: undefined, response})
    } catch (error) {
        return NextResponse.json({error, response: undefined})
    }
}