"use client";

import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { MovieCardHorizontal } from "@/app/components/movie-card-horizontal";
import React, { useEffect, useRef, useState } from "react";

export default function ActorPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = React.use(params);
    const {data: actor, error: actorError, isLoading: isActorLoading} = useSWR(
        `https://api.themoviedb.org/3/person/${id}`,
        fetcher
    );
    const {data: credits, error: creditsError, isLoading: isCreditsLoading} = useSWR(
        `https://api.themoviedb.org/3/person/${id}/movie_credits`,
        fetcher
    );
    const movies = credits?.cast ? [...credits.cast].sort((a: any, b: any) => b.popularity - a.popularity).slice(0, 10) : [];
    const [visibleCount, setVisibleCount] = useState(10);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            const el = scrollRef.current;
            if (!el) return;
            if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 100) {
                setVisibleCount((prev) => Math.min(prev + 10, movies.length));
            }
        };
        const el = scrollRef.current;
        if (el) {
            el.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (el) {
                el.removeEventListener("scroll", handleScroll);
            }
        };
    }, [movies.length]);

    if (actorError || creditsError) return <p>Failed to load.</p>;
    if (isActorLoading || isCreditsLoading) return <p>Loading...</p>;
    if (!actor) return <p>Actor not found.</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Profile Card */}
            <div
                className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white rounded-xl shadow-lg p-8 mb-12">
                <div
                    className="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mb-4 md:mb-0">
                    {actor.profile_path ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                            alt={actor.name}
                            width={192}
                            height={256}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        <span className="text-gray-400">Actor Picture</span>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold">{actor.name}</h1>
                        <span className="text-base text-gray-500">Actor</span>
                    </div>
                    {actor.birthday && (
                        <div className="text-gray-600 mb-2 flex items-center gap-2">
                            <span role="img" aria-label="birthday">🎂</span>
                            <span>Born: {actor.birthday}</span>
                        </div>
                    )}
                    {actor.biography && (
                        <p className="text-gray-700 whitespace-pre-line mt-2">{actor.biography || "Short Biography"}</p>
                    )}
                </div>
            </div>
            {/* Notable Movies Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Notable Movies</h2>
                {movies.length === 0 ? (
                    <p className="text-gray-500">No notable movies found.</p>
                ) : (
                    <div ref={scrollRef} className="flex flex-row overflow-x-scroll overflow-y-clip gap-x-4">
                        {movies.slice(0, visibleCount).map((movie: any) => (
                            <MovieCardHorizontal key={movie.id} movie={movie}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 