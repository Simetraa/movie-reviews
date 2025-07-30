"use client";
import MovieInfinitePage from "../components/movie-infinite-page";

export default function TrendingPage() {
    return (
        <MovieInfinitePage
            url="https://api.themoviedb.org/3/trending/movie/day"
            title="Trending Movies"
        />
    );
}