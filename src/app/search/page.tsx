"use client";

import { useSearchParams } from "next/navigation";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import { MovieCardHorizontal } from "../components/movie-card-horizontal";
import { Spinner } from "@/components/ui/spinner";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useEffect, useState } from "react";
import GenreFilterMenu from "../components/genre-filter-menu";
import SortByMenu from "../components/sort-by-menu";
import { Movie } from "@/types/Movie";



export default function SearchPage() {
    const searchParams = useSearchParams();
    const searchQueryRaw = searchParams.get("q") ?? "";
    const searchQuery = encodeURIComponent(searchQueryRaw);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [results, setResults] = useState<Movie[]>([]);


    const sortOptions = [
        { label: "Most Popular", value: "popularity.desc" },
        { label: "Highest Rated", value: "vote_average.desc" },
        { label: "Latest Releases", value: "release_date.desc" },
        { label: "Oldest First", value: "release_date.asc" },
        { label: "Lowest Rated", value: "vote_average.asc" },
    ];

    const [sortBy, setSortBy] = useState("popularity.desc");

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


    const url = `https://api.themoviedb.org/3/discover/movie?page=${page}${searchQuery ? `&with_text_query=${encodeURIComponent(searchQuery)}` : ""
        }${selectedGenres.length > 0 ? `&with_genres=${selectedGenres.join(",")}` : ""
        }&sort_by=${sortBy}`;

    const { data, error, isLoading } = useSWR<PaginatedResponse<Movie>>(url, fetcher);


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


    useEffect(() => {
        setPage(1);
        setResults([]);
        setHasMore(true);
    }, [searchQueryRaw]);

    const loadMore = () => {
        if (hasMore && !isLoading) {
            setPage((prev) => prev + 1);
        }
    };


    if (isLoading && page === 1) return <Spinner />;
    if (error) return <p>Error loading search results</p>;


    return (
        <>
            <div className="flex flex-wrap gap-4 items-center p-4">
                <GenreFilterMenu
                    genres={allGenres}
                    selectedGenres={selectedGenres}
                    onChange={setSelectedGenres}
                />
                <SortByMenu
                    options={sortOptions}
                    selectedSort={sortBy}
                    onChange={setSortBy}
                />
            </div>



            <InfiniteScroll isLoading={isLoading} next={loadMore} hasMore={hasMore}>
                <div className="grid [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] p-4 gap-4">
                    {results.map((movie) => (
                        <MovieCardHorizontal key={movie.id} movie={movie} />
                    ))}
                </div>
                {isLoading && <Spinner />}
            </InfiniteScroll>
        </>
    );
}