'use client'

import useSWR from "swr";
import Cookies from "js-cookie";
import fetcher from "../utils/fetcher";
import { Spinner } from "@/components/ui/spinner";
import pluralize from "pluralize";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PaginatedResponse } from "@/types/PaginatedResponse";

export default function ListsPage() {
    const sessionId = Cookies.get("session_id");
    const accountId = Cookies.get('account_id');


    const { data, error, isLoading } = useSWR<PaginatedResponse<List>>(`https://api.themoviedb.org/3/account/${accountId}/lists?session_id=${sessionId}`,
        fetcher
    )

    if (error) return <p>Failed to load.</p>
    if (isLoading) return <Spinner></Spinner>

    return <>
        <div className="grid gap-4">
            {data?.results.map((list) => (
                <Link key={list.id} href={`/lists/${list.id}`}>
                    <Card className="cursor-pointer hover:shadow-lg transition">
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
            ))}
        </div>
    </>
}