'use client'

import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { useParams } from "next/navigation";

export default function ListPage() {
    const { id } = useParams();

    const { data, error, isLoading } = useSWR<ListDetails>(
        `https://api.themoviedb.org/3/list/${id}`,
        fetcher
    )

    if (error) return <p>Failed to load.</p>
    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <h1>List Details</h1>
            {data && (
                <div>
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                </div>
            )}
        </div>
    )
}