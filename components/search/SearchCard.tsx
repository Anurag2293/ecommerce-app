// NODE MODULES
import Link from 'next/link'
import Image from 'next/image'

// STATE
import type { products as ProductType } from '@prisma/client'

// COMPONENT
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const SearchCard = ({ product }: { product: ProductType }) => {
    return (
        <Card key={product.id} className="w-auto aspect-square group hover:cursor-pointer hover:border hover:border-primary">
            <Link href={`/search/${product.id}`}>
                <CardContent className="h-full flex relative justify-center items-center">
                    <Image
                        className="w-auto h-48 hover:h-56 group-hover:h-56 rounded-lg transition-all duration-300 ease-in-out"
                        src={product.thumbnail || ""}
                        alt={String(product.title)}
                        width={500}
                        height={500}
                    />
                    <div className="absolute left-4 bottom-4 lg:left-1 lg:bottom-2 xl:left-4 xl:bottom-4 bg-white dark:bg-black backdrop:blur-3xl">
                        <div className="w-auto border rounded-3xl p-1 pl-4 flex justify-between items-center gap-1 text-sm font-semibold">
                            <p className="xl:hidden">{product.title?.substring(0, 20)}</p>
                            <p className="hidden xl:block">{product.title}</p>
                            <Badge className="h-10 w-auto text-white">
                                {"$"}{" "}{String(product.price)}{" "}{"USD"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}

export default SearchCard;