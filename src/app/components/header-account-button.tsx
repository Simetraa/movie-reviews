import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import Gravatar from "react-gravatar";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button"


export function HeaderAccountButton() {
    const sessionId = Cookies.get("session_id");

    const { data: accountData, error: accountError, isLoading: isAccountLoading } = useSWR(
        `https://api.themoviedb.org/3/account?session_id=${sessionId}`,
        fetcher,
        { refreshInterval: 0, shouldRetryOnError: false }
    )

    function handleLogout() {
        Cookies.remove("session_id")
        window.location.href = "/"
    }

    if (accountError || !sessionId) return <NavigationMenuLink asChild>
        <Link href="/login">Login</Link>
    </NavigationMenuLink>
    if (isAccountLoading) return <div className="flex flex-row items-center gap-2 p-[8px]">
        <Skeleton className="w-[50px] h-[50px] rounded-full"></Skeleton>
        <Skeleton className="w-[70px] h-[50px]"></Skeleton>
    </div>

    return (
        <div className="flex items-center gap-2 pr-2">
            <NavigationMenuLink asChild className="flex flex-row items-center gap-2">
                <Link href="/account">
                    <div className="flex flex-row items-center gap-2">
                        <Gravatar md5={accountData.avatar.gravatar.hash} className="rounded-lg w-10 h-10"/>
                        <span className="hidden md:block">{accountData.username}</span>
                    </div>
                </Link>
            </NavigationMenuLink>
            <Button
                variant="ghost"
                size="sm"
                className="text-sm font-normal"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    )

}