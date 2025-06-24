"use client";

import { useSearchParams } from "next/navigation";
import { MovieCard } from "../components/movie-card";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import { MovieCardHorizontal } from "../components/movie-card-horizontal";
import { Spinner } from "@/components/ui/spinner";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const searchQuery = encodeURIComponent(useSearchParams().get("q") ?? "");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [results, setResults] = useState<Movie[]>([]);

    function next() {

    }

    const { data, error, isLoading } = useSWR<PaginatedResponse<Movie>>(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}`,
        fetcher
    );

    if (isLoading && page === 1) return <Spinner />;
    if (error) return <p>Error loading search results</p>;


    return (
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] p-4 gap-4">
            {data?.results.map((movie: Movie) => (
                <MovieCardHorizontal key={movie.id} movie={movie} />
            ))}
        </div>
    )
}