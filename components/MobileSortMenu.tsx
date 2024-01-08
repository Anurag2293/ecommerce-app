import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SortMenu = () =>{
    return (
        <div className="px-4 my-8 w-full md:hidden">
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="_">Relevance</SelectItem>
                        <SelectItem value="trending-desc">Trending</SelectItem>
                        <SelectItem value="latest-desc">Latest arrivals</SelectItem>
                        <SelectItem value="price-asc">Price: Low to high</SelectItem>
                        <SelectItem value="price-desc">Price: High to lows</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SortMenu;