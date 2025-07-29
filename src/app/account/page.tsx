"use client"

import { useParams } from "next/navigation";
import useSWR from 'swr'
import Cookies from 'js-cookie'
import { useMemo } from "react";
import Gravatar from "react-gravatar";
import { Separator } from "@/components/ui/separator";
import { BinocularsIcon, Heart, List, Star, ArrowRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import pluralize from "pluralize";
import { MovieCardHorizontal } from "../components/movie-card-horizontal";
import { Movie } from "@/types/Movie";
import { Badge } from "@/components/ui/badge";
import { PaginatedResponse } from "@/types/PaginatedResponse";

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

    const { data: listData, error: listsError, isLoading: isListsLoading } = useSWR<PaginatedResponse<List>>(
        `https://api.themoviedb.org/3/account/${memoizedId}/lists?session_id=${sessionId}`,
        fetcher
    )

    const { data: watchlistData, error: watchlistError, isLoading: isWatchlistLoading } = useSWR<PaginatedResponse<Movie>>(
        `https://api.themoviedb.org/3/account/${memoizedId}/watchlist/movies?session_id=${sessionId}`,
        fetcher
    )

    const { data: ratedMoviesData, error: ratedMoviesError, isLoading: isRatedMoviesLoading } = useSWR<PaginatedResponse<Movie>>(
        `https://api.themoviedb.org/3/account/${memoizedId}/rated/movies?session_id=${sessionId}`,
        fetcher
    )

    const { data: favouriteMoviesData, error: favouriteMoviesError, isLoading: isFavouriteMoviesLoading } = useSWR<PaginatedResponse<Movie>>(
        `https://api.themoviedb.org/3/account/${memoizedId}/favorite/movies?session_id=${sessionId}`,
        fetcher
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
            {isListsLoading && <Spinner></Spinner>}
            {/* horizontal scrolling list, similar to index */}
            {listsError && <p>Failed to load lists.</p>}
            <div className="flex overflow-x-auto gap-4">
                {listData?.results.map((list) => (
                    <Link key={list.id} href={`/lists/${list.id}`}>
                        <Card className="w-48">
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

            {/* Watchlist Section */}
            <h2 className="text-md font-medium">
                <BinocularsIcon className="inline-block mr-2" />Watchlist
            </h2>
            {isWatchlistLoading && <Spinner />}
            {watchlistError && <p>Failed to load watchlist.</p>}
            <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-clip">
                {watchlistData?.results.slice(0, 10).map((item) => (
                    <MovieCardHorizontal key={item.id} movie={item} />
                ))}
                <Link href="/watchlist">
                    <div className="flex w-[150px] h-[321px] flex-col items-center justify-center shadow-md rounded-md overflow-hidden bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer">
                        <ArrowRight className="w-8 h-8 text-gray-400" />
                        <span className="text-gray-500 mt-2 font-semibold">See all</span>
                    </div>
                </Link>
            </div>
            <h2 className="text-md font-medium"><Star className="inline-block mr-2" />Rated Movies</h2>
            {isRatedMoviesLoading && <Spinner></Spinner>}
            {ratedMoviesError && <p>Failed to load rated movies.</p>}
            <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-clip">
                {ratedMoviesData?.results.map((item) => (
                    <MovieCardHorizontal key={item.id} movie={item} />
                ))}
            </div>

            <h2 className="text-md font-medium"><Heart className="inline-block mr-2" />Favorite Movies</h2>
            {isFavouriteMoviesLoading && <Spinner></Spinner>}
            {favouriteMoviesError && <p>Failed to load favourite movies.</p>}
            <div className="flex flex-row gap-4 overflow-x-scroll overflow-y-clip">
                {favouriteMoviesData?.results.map((item) => (
                    <MovieCardHorizontal key={item.id} movie={item} />
                ))}
            </div>
        </>
    )
}