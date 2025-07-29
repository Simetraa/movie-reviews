"use client";


import useSWR from "swr";
import fetcher from "./utils/fetcher";
import { MovieCardRow } from "./components/movie-card-row";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
    const { data: trendingData, error: trendingError, isLoading: isTrendingLoading } = useSWR(
        `https://api.themoviedb.org/3/trending/movie/day`,
        fetcher
    )

    const { data: popularData, error: popularError, isLoading: isPopularLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/popular`,
        fetcher
    )

    const { data: topData, error: topError, isLoading: isTopLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/top_rated`,
        fetcher
    )

    const { data: upcomingData, error: upcomingError, isLoading: isUpcomingLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/upcoming`,
        fetcher
    )


    // const { data: imageData, error: imageError, isLoading: isImageLoading } = useSWR(
    //     `https://api.themoviedb.org/3/movie/${id}/images`
    // )

    if (popularError || topError || upcomingError || trendingError) return <p>Failed to load.</p>
    if (isPopularLoading || isTopLoading || isUpcomingLoading || isTrendingLoading) return <Spinner />

    return <>
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div>
                    <Link href="/trending"><h1 className="text-xl">Trending Movies</h1></Link>
                </div>
                <MovieCardRow movies={trendingData.results} seeMorePath={"/trending"}></MovieCardRow>
            </div>

            <div className="flex flex-col gap-2">
                <Link href="/popular"><h1 className="text-xl">Popular Releases</h1></Link>
                <MovieCardRow movies={popularData.results} seeMorePath={"/popular"}></MovieCardRow>
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/upcoming"><h1 className="text-xl">Upcoming Movies</h1></Link>
                <MovieCardRow movies={upcomingData.results} seeMorePath={"/upcoming"}></MovieCardRow>
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/top"><h1 className="text-xl">Top Movies</h1></Link>
                <MovieCardRow movies={topData.results} seeMorePath={"/top"}></MovieCardRow>
            </div >
        </div>
    </>
}