"use client"

import { useParams } from "next/navigation";
import useSWR from 'swr'
import Cookies from 'js-cookie'
import { useMemo } from "react";
import { AccountHeader } from "../components/account-header";
import { WatchlistRow } from "../components/watchlist-row";
import Gravatar from "react-gravatar";
import { Separator } from "@/components/ui/separator";
import { BinocularsIcon, Flag, Heart, List, Star } from "lucide-react";
import emojiFlags from 'emoji-flags';
import ReactCountryFlag from "react-country-flag";

const fetcher = async (url: string) => {
    const token = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`
    const r = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: token
        }
    }
    );

    if (!r.ok) {
        throw new Error("Could not fetch data")
    }
    return await r.json();
}

export default function AccountPage() {
    const { id } = useParams();
    const memoizedId = useMemo(() => id, [id]);

    const sessionId = Cookies.get("session_id");

    const { data: accountData, error: accountError, isLoading: isAccountLoading } = useSWR<AccountDetails>(
        `https://api.themoviedb.org/3/account${memoizedId ? "/" + memoizedId : ""}?session_id=${sessionId}`,
        fetcher,
        { refreshInterval: 0, shouldRetryOnError: false }
    )


    console.log("Memoised id", memoizedId)

    if (accountError) return <p>Failed to load.</p>
    if (isAccountLoading) return <p>Loading...</p>



    return (
        <>

            <div className="flex items-center bg-accent gap-4 mx-[-32px] px-[32px] py-4">
                <Gravatar md5={accountData?.avatar.gravatar.hash}></Gravatar>
                <h1 className="text-xl">{accountData?.username}</h1>
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <span>#{accountData?.id}</span>
                    <Separator orientation="vertical" className="h-6 w-px bg-border" />
                    <ReactCountryFlag countryCode={accountData?.iso_3166_1!} svg style={{
                        width: '2em',
                        height: '2em',
                    }} />
                </div>
            </div>
            <h2 className="text-md font-medium"><List className="inline-block mr-2" />Your Lists</h2>
            {/* horizontal scrolling list, similar to index */}
            <h2 className="text-md font-medium"><BinocularsIcon className="inline-block mr-2" />Watchlist</h2>
            <h2 className="text-md font-medium"><Star className="inline-block mr-2" />Rated Movies</h2>
            <h2 className="text-md font-medium"><Heart className="inline-block mr-2" />Favorite Movies</h2>
        </>
    )
}