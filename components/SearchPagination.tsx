import React from 'react'

type Props = {
    totalProducts: number,
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    productsPerPage: number,
}

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const SearchPagination = ({ setCurrentPage, currentPage, totalProducts, productsPerPage}: Props) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePreviousClick = () => {
        if (currentPage === 1) return;
        setCurrentPage((prevPage) => prevPage - 1);
    }

    const handleNextClick = () => {
        if (currentPage === totalPages) return;
        setCurrentPage((prevPage) => prevPage + 1);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem hidden={currentPage === 1}>
                    <PaginationPrevious href="#" onClick={handlePreviousClick} />
                </PaginationItem>

                {totalPages > 0 && (
                    Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink href="#" onClick={() => setCurrentPage(i + 1)} isActive={currentPage === i+1}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                )}

                <PaginationItem hidden={currentPage === totalPages}>
                    <PaginationNext href="#" onClick={handleNextClick} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default SearchPagination;