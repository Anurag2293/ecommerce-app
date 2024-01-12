import React from 'react'

type Props = {
    params: { category: string }
}

const Category = ({ params }: Props) => {
    return (
        <div>Category: {params.category}</div>
    )
}

export default Category