"use client";

import useSWR from "swr";
import fetcher from "./utils/fetcher";
import { MovieCardRow } from "./components/movie-card-row";

export default function Home() {
    const { data: popularData, error: popularError, isLoading: isPopularLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/popular`,
        fetcher
    )


    // const { data: imageData, error: imageError, isLoading: isImageLoading } = useSWR(
    //     `https://api.themoviedb.org/3/movie/${id}/images`
    // )

    if (popularError) return <p>Failed to load.</p>
    if (isPopularLoading) return <p>Loading...</p>



    return <div className="p-4">
        <h1 className="text-xl">New Releases</h1>
        <MovieCardRow movies={popularData.results} seeMorePath={""}></MovieCardRow>
    </div>
}