"use client";

import Image from "next/image";
import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { MovieCardHorizontal } from "@/app/components/movie-card-horizontal";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { PersonWithCredits } from "@/types/Person";
import { Spinner } from "@/components/ui/spinner";
import { Cake } from "lucide-react";

export default function ActorPage() {
  const { id } = useParams();

  const { data: actor, error: actorError, isLoading: isActorLoading } = useSWR<PersonWithCredits>(
    `https://api.themoviedb.org/3/person/${id}?append_to_response=movie_credits`,
    fetcher
  );

  if (actorError) return <p>Failed to load actor data.</p>;
  if (isActorLoading) return <Spinner></Spinner>;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mb-4 md:mb-0">
          {actor?.profile_path ? (
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
            <h1 className="text-3xl font-bold">{actor?.name}</h1>
            <span className="text-base text-gray-500">Actor</span>
          </div>
          {actor?.birthday && (
            <div className="text-gray-600 mb-2 flex items-center gap-2">
              <Cake></Cake>
              <span>Born: {actor.birthday}</span>
            </div>
          )}
          {actor?.biography && (
            <p className="text-gray-700 whitespace-pre-line mt-2">{actor.biography || "Short Biography"}</p>
          )}
        </div>
      </div>


      {/* Notable Movies Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notable Movies</h2>
        <div className="flex flex-row overflow-x-scroll overflow-y-clip gap-x-4">
          {actor?.movie_credits.cast.map((movie) => (
            <MovieCardHorizontal key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
} 