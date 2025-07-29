"use client";
import useSWR from 'swr'
import {redirect} from 'next/navigation'

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

export default function LoginPage() {
    const { data, error, isLoading } = useSWR(
        `https://api.themoviedb.org/3/authentication/token/new`,
        fetcher
    )


    if (error) return <p>Failed to load.</p>
    if (isLoading) return <p>Loading...</p>

    let requestToken = data.request_token


    redirect(`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http:localhost:3000/login/approved`)
}