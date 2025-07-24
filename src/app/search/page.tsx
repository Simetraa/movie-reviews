"use client";

import { useSearchParams } from "next/navigation";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import { MovieCardHorizontal } from "../components/movie-card-horizontal";
import { Spinner } from "@/components/ui/spinner";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useEffect, useState } from "react";
import GenreFilterMenu from "../components/genre-filter-menu";


export default function SearchPage() {

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


    const searchParams = useSearchParams();
    const searchQueryRaw = searchParams.get("q") ?? "";
    const searchQuery = encodeURIComponent(searchQueryRaw);

    const [page, setPage] = useState(1);
    //const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [results, setResults] = useState<Movie[]>([]);
    const [filteredResults, setFilteredResults] = useState<Movie[]>([]); // gefilterte Ergebnisse


    //Genre Filter
    const allGenres = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 99, name: "Documentary" },
        { id: 14, name: "Fantasy" },
        { id: 27, name: "Horror" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
    ]

    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);


    const url = searchQuery
        ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`
        : null;

    const { data, error, isLoading } = useSWR<PaginatedResponse<Movie>>(url, fetcher);

    //should append new data when there is new data for a page ( i dont know hwo necesary this will be but its nice to have i guess)
    useEffect(() => {
        if (data?.results) {

            if (page === 1) {
                setResults(data.results);
            } else {
                setResults((prev) => [...prev, ...data.results]);
            }

            setHasMore(data.page < data.total_pages);
        }
    }, [data, page]);

    //reset everything when new search is made
    useEffect(() => {
        setPage(1);
        setResults([]);
        setFilteredResults([]);
        setHasMore(true);
    }, [searchQueryRaw]);


    //client side filtering because tmdb doesnt allow filter with /movie? request
    useEffect(() => {
        if (selectedGenres.length === 0) {
            setFilteredResults(results);
        } else {
            setFilteredResults(
                results.filter((movie) =>
                    Array.isArray(movie.genre_ids) && movie.genre_ids.some((id) => selectedGenres.includes(id))
                )
            );
        }
    }, [selectedGenres, results]);

    const loadMore = () => {
        if (hasMore && !isLoading) {
            setPage((prev) => prev + 1);
        }
    };


    if (isLoading && page === 1) return <Spinner />;
    if (error) return <p>Error loading search results</p>;


    return (
        <>
        <GenreFilterMenu
            genres={allGenres}
            selectedGenres={selectedGenres}
            onChange={setSelectedGenres} />
        <InfiniteScroll isLoading={isLoading} next={loadMore} hasMore={hasMore}>
            <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] p-4 gap-4">
                {filteredResults.map((movie) => (
                    <MovieCardHorizontal key={movie.id} movie={movie} />
                ))}
            </div>
            {isLoading && <Spinner />}
        </InfiniteScroll>
        </>
    );
}