import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import Gravatar from "react-gravatar";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";

export function HeaderAccountButton() {
    const sessionId = Cookies.get("session_id");

    const { data: accountData, error: accountError, isLoading: isAccountLoading } = useSWR(
        `https://api.themoviedb.org/3/account?session_id=${sessionId}`,
        fetcher,
        { refreshInterval: 0, shouldRetryOnError: false }
    )

    if (accountError) return <NavigationMenuLink href="/login">Login</NavigationMenuLink>
    if (isAccountLoading) return <div className="flex flex-row items-center gap-2 p-[8px]">`
        <Skeleton className="w-[50px] h-[50px] rounded-full"></Skeleton>
        <Skeleton className="w-[70px] h-[50px]"></Skeleton>
    </div>

    return (
        <NavigationMenuLink href="/account" className="flex flex-row items-center gap-2">
            <Gravatar md5={accountData.avatar.gravatar.hash}></Gravatar>
            <span>{accountData.username}</span>
        </NavigationMenuLink>
    )

}