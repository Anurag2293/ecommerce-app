
// COMPONENT
import CategoriesMenuMobile from '@/components/MobileCategoriesMenu'
import SortMenu from '@/components/MobileSortMenu'
import SearchResults from '@/components/SearchResults'
import CategoriesMenu from '@/components/CategoriesMenu'

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CategoriesMenuMobile />
            <SortMenu />
            <div className='w-full flex justify-between px-4 py-0 md:px-6 md:py-0'>
                <div className='hidden md:block'>
                    {/* Categories */}
                    <CategoriesMenu currentCategoryName={"All"} />
                </div>
                <div className='w-full md:w-5/6'>
                    {children}
                </div>
                <div className='hidden md:block'>
                    Sort by
                </div>
            </div>
        </>
    )
}
