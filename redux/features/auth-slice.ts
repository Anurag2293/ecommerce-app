import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    isAuthenticated: boolean;
    username: string;
    uid: string;
}

type InitialState = {
    value: AuthState
}

const initialState = {
    value: {
        isAuthenticated: false,
        username: "",
        uid: "",
    } as AuthState
} as InitialState;

type logInPayload = {
    username: string,
    uid: string
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction<logInPayload>) => {
            return {
                value: {
                    isAuthenticated: true,
                    username: action.payload.username,
                    uid: action.payload.uid,
                }
            }
        }
    }
})

// Exporting functions from auth slice
export const { logIn, logOut } = auth.actions;
export default auth.reducer;