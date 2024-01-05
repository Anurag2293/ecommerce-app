
// COMPONENT
import CollectionMenu from '@/components/CategoriesMenu'
import SortMenu from '@/components/SortMenu'
import SearchResults from '@/components/SearchResults'

type Props = {}

const Search = (props: Props) => {
    return (
        <>
            <CollectionMenu />
            <SortMenu />
            <div className='w-full flex justify-between px-4 py-0 md:px-6 md:py-0'>
                <div className='hidden md:block'>
                    Categories
                </div>
                <div className='w-full md:w-5/6'>
                    <SearchResults />
                </div>
                <div className='hidden md:block'>
                    Sort by
                </div>
            </div>
        </>
    )
}

export default Search