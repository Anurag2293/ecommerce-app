import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const params = request.nextUrl.searchParams;
        const product_id = params.get('product_id') || undefined;
        const category_id = params.get('category_id') || undefined;

        let product_categories;
        if (product_id) {
            product_categories = await prisma.product_categories.findFirst({
                where: {
                    product_id: Number(product_id)
                }
            });
        } else if (category_id) {
            product_categories = await prisma.product_categories.findMany({
                where: {
                    category_id: Number(category_id)
                }
            });
        } else {
            product_categories = await prisma.product_categories.findMany();
        }
        return NextResponse.json({error: undefined, response: product_categories})
    } catch (error) {
        return NextResponse.json({error, response: undefined})
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const { product_id, category_id } = await request.json();
        const product_category = await prisma.product_categories.create({
            data: {
                product_id,
                category_id
            }
        });
        return NextResponse.json({error: undefined, response: product_category})
    } catch (error: any) {
        return NextResponse.json({error: error.message, response: undefined})
    }
}

export const PUT = async (request: NextRequest) => {
    try {
        const { product_id, category_id, updated_product_id, updated_category_id } = await request.json();

        const originalProductCategory = await prisma.product_categories.findFirst({
            where: {
                product_id: Number(product_id),
                category_id: Number(category_id)
            }
        })

        const updatedProductCategory = await prisma.product_categories.update({
            where: {
                product_id_category_id: {
                    product_id: Number(product_id),
                    category_id: Number(category_id)
                }
            },
            data: {
                product_id: updated_product_id || originalProductCategory?.product_id,
                category_id: updated_category_id || originalProductCategory?.category_id
            }
        });
        return NextResponse.json({error: undefined, response: updatedProductCategory})
    } catch (error: any) {
        return NextResponse.json({error: error.message, response: undefined})
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const { product_id, category_id } = await request.json();
        const deletedProductCategory = await prisma.product_categories.delete({
            where: {
                product_id_category_id: {
                    product_id: Number(product_id),
                    category_id: Number(category_id)
                }
            }
        });
        return NextResponse.json({error: undefined, response: deletedProductCategory})
    } catch (error) {
        return NextResponse.json({error, response: undefined})
    }
}