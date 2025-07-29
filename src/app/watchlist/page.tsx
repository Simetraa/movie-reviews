"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import type { Movie } from "@/types/Movie";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { MovieCardHorizontal } from "../components/movie-card-horizontal";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import type { PaginatedResponse } from "@/types/PaginatedResponse";

export default function WatchlistPage() {
    const sessionId = Cookies.get("session_id");
    const [accountId, setAccountId] = useState<string | null>(null);

    // Fetch accountId on mount
    useEffect(() => {
        async function fetchAccountId() {
            if (!sessionId) return;
            const res = await fetch(`https://api.themoviedb.org/3/account?session_id=${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
                    accept: "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                setAccountId(data.id);
            }
        }

        fetchAccountId();
    }, [sessionId]);

    const url = accountId && sessionId
        ? `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?session_id=${sessionId}&language=en-US&sort_by=created_at.asc`
        : null;

    const {data, error, isLoading} = useSWR<PaginatedResponse<Movie>>(url, fetcher);

    // Split movies into rows of 7
    const splitMoviesIntoRows = (movies: Movie[]) => {
        const moviesPerRow = 7;
        const rows = [];

        for (let i = 0; i < movies.length; i += moviesPerRow) {
            rows.push(movies.slice(i, i + moviesPerRow));
        }

        return rows;
    };

    const handleAddToWatchlist = () => {
        // Navigate to search page to find and add movies
        window.location.href = '/search';
    };

    if (error) return <p className="text-gray-600">Failed to load watchlist.</p>;
    if (isLoading) return <Spinner/>;
    if (!data || !data.results || data.results.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-8 w-full">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Watchlist</h1>
                <p className="text-gray-600">Your watchlist is empty.</p>
            </div>
        );
    }

    const movieRows = splitMoviesIntoRows(data.results);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 w-full">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Watchlist</h1>

            <div className="flex flex-col gap-8">
                {movieRows.map((rowMovies, index) => (
                    <div key={index}>
                        <div className="grid grid-cols-7 gap-4">
                            {rowMovies.map((movie) => (
                                <MovieCardHorizontal key={movie.id} movie={movie}/>
                            ))}
                            {/* Add button - only show in the last row */}
                            {index === movieRows.length - 1 && (
                                <button
                                    onClick={handleAddToWatchlist}
                                    className="flex w-[150px] flex-col shadow-md rounded-md overflow-hidden hover:scale-102 duration-300 h-full bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all"
                                >
                                    <div className="flex-1 flex items-center justify-center p-2">
                                        <Plus className="w-8 h-8 text-gray-400"/>
                                    </div>
                                    <div className="flex flex-col flex-1 p-2 justify-between min-h-0">
                                        <h2 className="text-l font-semibold text-gray-500">Add Movie</h2>
                                        <div className="flex items-center gap-1 justify-evenly mt-2">
                                        </div>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 