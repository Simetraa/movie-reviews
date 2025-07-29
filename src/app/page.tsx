"use client";


import useSWR from "swr";
import fetcher from "./utils/fetcher";
import { MovieCardRow } from "./components/movie-card-row";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
    return <>
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div>
                    <Link href="/trending"><h1 className="text-xl">Trending Movies</h1></Link>
                </div>
                <MovieCardRow url="https://api.themoviedb.org/3/trending/movie/day" seeMorePath={"/trending"}></MovieCardRow>
            </div>

            <div className="flex flex-col gap-2">
                <Link href="/popular"><h1 className="text-xl">Popular Releases</h1></Link>
                <MovieCardRow url="https://api.themoviedb.org/3/movie/popular" seeMorePath={"/popular"}></MovieCardRow>
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/upcoming"><h1 className="text-xl">Upcoming Movies</h1></Link>
                <MovieCardRow url="https://api.themoviedb.org/3/movie/upcoming" seeMorePath={"/upcoming"}></MovieCardRow>
            </div>
            <div className="flex flex-col gap-2">
                <Link href="/top"><h1 className="text-xl">Top Movies</h1></Link>
                <MovieCardRow url="https://api.themoviedb.org/3/movie/top_rated" seeMorePath={"/top"}></MovieCardRow>
            </div >
        </div>
    </>
}