'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import { Spinner } from "@/components/ui/spinner";
import pluralize, { plural } from "pluralize";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ListsPage() {
    const sessionId = Cookies.get("session_id");

    const { data, error, isLoading } = useSWR<PaginatedResponse<List>>(
        `https://api.themoviedb.org/3/account/{account_id}/lists?session_id=${sessionId}`,
        fetcher
    )

    if (error) return <p>Failed to load.</p>
    if (isLoading) return <Spinner></Spinner>

    return <>
        {data && data.results.map((list: List) => (
            <div key={list.id}>
                <Link href={`/lists/${list.id}`}>
                    <Card>
                        <CardHeader>{list.name}</CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <CardDescription>{list.description}</CardDescription>
                            <div className="flex gap-2">
                                <Badge>{pluralize("item", list.item_count, true)}</Badge>
                                <Badge>{pluralize("favourites", list.favorite_count, true)}</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        ))}
    </>

}