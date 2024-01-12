import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { products as ProductType } from "@prisma/client";

type SearchState = {
    products: ProductType[],
    category: string,
    categoryId: number,
    sort: string,
    query: string
}

type InitialState = {
    value: SearchState
}

const initialState = {
    value: {
        products: [],
        category: "All",
        sort: "",
        query: "",
        categoryId: 0
    }
} as InitialState;

export const search = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearch: (state, action: PayloadAction<SearchState>) => {
            return {
                value: {
                    ...state.value,
                    products: action.payload.products,
                    category: action.payload.category,
                    sort: action.payload.sort,
                    query: action.payload.query,
                    categoryId: action.payload.categoryId
                }
            }
        },
        resetSearch: (state, action) => {
            return initialState;
        }
    }
})

export const { updateSearch, resetSearch } = search.actions;
export default search.reducer;