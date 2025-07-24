"use client"

import { useParams } from "next/navigation";
import useSWR from 'swr'
import Cookies from 'js-cookie'
import { useMemo } from "react";
import { AccountHeader } from "../components/account-header";
import { WatchlistRow } from "../components/watchlist-row";

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

    const { data: accountData, error: accountError, isLoading: isAccountLoading } = useSWR(
        `https://api.themoviedb.org/3/account${memoizedId ? "/" + memoizedId : ""}?session_id=${sessionId}`,
        fetcher,
        { refreshInterval: 0, shouldRetryOnError: false }
    )


    console.log("Memoised id", memoizedId)

    if (accountError) return <p>Failed to load.</p>
    if (isAccountLoading) return <p>Loading...</p>



    return <>
        <AccountHeader username={accountData.username} avatarHash={accountData.avatar.gravatar.hash}></AccountHeader>
        
    </>
}