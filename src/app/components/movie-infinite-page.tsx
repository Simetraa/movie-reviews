"use client";
import { Movie } from "@/types/Movie"
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { MovieCardHorizontal } from "../components/movie-card-horizontal"
import fetcher from "../utils/fetcher"

//import useSWR from 'swr'

export default function MovieInfinitePage(props: { url: string, title: string }) {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const fetchMovies = async (page: number) => {
        setIsLoading(true);
        try {
            const res = await fetcher(`${props.url}?page=${page}`);
            setMovies(prev => [...prev, ...res.results]);
            setHasMore(page < res.total_pages);
            setError(null);
        } catch (err) {
            setError("Failed to load.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    const loadMore = () => {
        if (!isLoading && hasMore) {
            setPage(prev => prev + 1);
        }
    };


    if (error) return <p>Failed to load.</p>
    if (isLoading && page == 1) return <p>Loading...</p>

    return <>
        <div className="max-w-7xl mx-auto p-4 w-full">
            <h1 className="text-2xl font-bold">{props.title}</h1>
        </div>

        <InfiniteScroll isLoading={isLoading} next={loadMore} hasMore={hasMore}>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] p-4 gap-4">
                {movies.map((movie) => (
                    <MovieCardHorizontal key={movie.id} movie={movie}/>
                ))}
            </div>
            {isLoading && <Spinner/>}
        </InfiniteScroll>
    </>
}