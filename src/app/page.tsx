"use client";


import useSWR from "swr";
import fetcher from "./utils/fetcher";
import { MovieCardRow } from "./components/movie-card-row";
import { Spinner } from "@/components/ui/spinner";

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
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">Trending Movies</h1>
            <MovieCardRow movies={trendingData.results} seeMorePath={"/trending"}></MovieCardRow>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="text-xl">Popular Releases</h1>
            <MovieCardRow movies={popularData.results} seeMorePath={""}></MovieCardRow>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">Upcoming Movies</h1>
            <MovieCardRow movies={upcomingData.results} seeMorePath={""}></MovieCardRow>
        </div>
        <div className="flex flex-col gap-2">
            <h1 className="text-xl">Top Movies</h1>
            <MovieCardRow movies={topData.results} seeMorePath={""}></MovieCardRow>
        </div >

    </>
}