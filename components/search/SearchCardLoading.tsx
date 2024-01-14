
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const SearchCardLoading = ({ id }: { id: number }) => {
    return (
        <Card key={id} className="w-auto aspect-square">
            <Skeleton className="h-full w-full rounded-b-lg" />
        </Card>
    )
}

export default SearchCardLoading;