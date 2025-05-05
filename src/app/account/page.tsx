"use client"

import { useParams } from "next/navigation";
import useSWR from 'swr'
import Cookies from 'js-cookie'

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
    return await r.json();
}

export default function AccountPage() {
    const sessionId = Cookies.get("session_id");

    const { data: detailsData, error: detailsError, isLoading: isDetailsLoading } = useSWR(
        `https://api.themoviedb.org/3/account?session_id=${sessionId}`,
        fetcher
    )


    if (detailsError) return <p>Failed to load.</p>
    if (isDetailsLoading) return <p>Loading...</p>


    return <>
        <p>{sessionId}</p>
        <p>{detailsData.username}</p>
    </>
}