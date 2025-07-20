'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import { Spinner } from "@/components/ui/spinner";

export default function ListsPage() {
    const sessionId = Cookies.get("session_id");

    const { data, error, isLoading } = useSWR<ListDetails>(
        `https://api.themoviedb.org/3/account/{account_id}/lists?session_id=${sessionId}`,
        fetcher
    )

    if (error) return <p>Failed to load.</p>
    if (isLoading) return <Spinner></Spinner>

    return <>
        {data && data.items.map((list: ListItem) => (
            <div key={list.id}>
                <h2>{list.title}</h2>
                <p>{list.overview}</p>
            </div>
        ))}
    </>

}