"use client";

import { useSearchParams } from "next/navigation";
import { MovieCard } from "../components/movie-card";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import { MovieCardHorizontal } from "../components/movie-card-horizontal";

export default function SearchPage() {
    const searchQuery = encodeURIComponent(useSearchParams().get("q") ?? "");

    const { data: searchData, error: searchError, isLoading: isSearchLoading } = useSWR(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`,
        fetcher
    )

    return (
        <div className="flex flex-wrap justify-between p-4 gap-2">
            {isSearchLoading && <p>Loading...</p>}
            {searchError && <p>Error loading search results</p>}
            {searchData && searchData.results.map((movie: Movie) => (
                <MovieCardHorizontal key={movie.id} movie={movie} />
            ))}
        </div>
    )
}