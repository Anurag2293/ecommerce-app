import * as React from "react"
import Image from "next/image"
import type { products as ProductType } from "@prisma/client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent
} from "@/components/ui/card"

const ProductCard = ({ product }: { product: ProductType}) => {
    return (
        <Card key={product.id} className="w-auto aspect-square">
            <CardContent className="h-full flex relative justify-center items-center bg-yellow-300">
                <Image
                    className="w-auto h-48 hover:h-56 rounded-lg transition-all duration-300 ease-in-out"
                    src={product.thumbnail || ""}
                    alt={String(product.title)}
                    width={500}
                    height={500}
                />
            </CardContent>
        </Card>
    )
}

export default ProductCard;