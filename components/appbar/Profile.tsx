"use client"

// NODE MODULES
import { useEffect } from "react";

// STATE
import { createClient } from "@/utils/supabase/client";
import { useAppSelector } from "@/redux/store";
import { logIn, logOut } from "@/redux/features/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

// COMPONENT
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Profile = () => {
    const supabase = createClient();
	const isAuthenticated = useAppSelector((state) => state.authReducer.value.isAuthenticated);
	const dispatch = useAppDispatch();
    const { toast } = useToast();

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
                // alert(error.message);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        }
		checkSession();
	}, [])

	const handleSignout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			// console.log("Error signing out:", error.message);
            toast({
                variant: "destructive",
                title: "Error signing out",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
		} else {
			dispatch(logOut());
			// console.log("Signed out!");
            toast({
                variant: "default",
                title: "Signed out!",
                description: "You have been signed out"
            })
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