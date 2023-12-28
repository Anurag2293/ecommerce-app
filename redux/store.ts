import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import authReducer from "./features/auth-slice"

export const store = configureStore({
    reducer: {
        authReducer
    }
})

// Get types of this store and export them
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

// export custom useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;