"use client"

import { useEffect } from "react";

import { createClient } from "@/utils/supabase/client";
import { useAppSelector } from "@/redux/store";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuPortal,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
    const supabase = createClient();
	const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);
	const dispatch = useAppDispatch();

	useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await supabase.auth.getSession();
                if (session.data.session) {
                    dispatch(logIn({username: String(session.data.session?.user.email), uid: String(session.data.session?.user.id) }));
                } else {
                    dispatch(logOut());
                }
            } catch (error: any) {
                alert(error.message);
            }
        }
		checkSession();
	}, [])

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log("Error signing out:", error.message);
		} else {
			dispatch(logOut());
			console.log("Signed out!");
		}
	}

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Profile;