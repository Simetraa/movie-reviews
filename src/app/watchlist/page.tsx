"use client"

import { useEffect, useState, useRef } from "react"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import Cookies from "js-cookie"
import type { Movie } from "@/types/Movie";

export default function WatchlistPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWatchlist() {
      const sessionId = Cookies.get("session_id")
      if (!sessionId) {
        console.error("No session ID found")
        setLoading(false)
        return
      }

      try {
        
        const accountRes = await fetch(`https://api.themoviedb.org/3/account?session_id=${sessionId}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
            accept: "application/json",
          },
        })

        const accountData = await accountRes.json()
        const accountId = accountData.id

        
        const watchlistRes = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?session_id=${sessionId}&language=en-US&sort_by=created_at.asc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
              accept: "application/json",
            },
          }
        )

        const watchlistData = await watchlistRes.json()
        setMovies(watchlistData.results || [])
      } catch (error) {
        console.error("Failed to fetch watchlist:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWatchlist()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Watchlist</h1>

      {loading ? (
        <p className="text-gray-600">Loading watchlist...</p>
      ) : movies.length === 0 ? (
        <p className="text-gray-600">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <Card className="w-[150px] flex flex-col shadow-md rounded-md overflow-hidden hover:scale-102 duration-300 h-full">
                <CardContent className="p-0">
                  <Image
                    width={500}
                    height={600}
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="flex flex-col flex-1 p-2 justify-between min-h-0">
                    <h2 className="text-l font-semibold">{movie.title}</h2>
                    <div className="flex items-center gap-1 justify-evenly mt-2">
                      <div className="flex gap-1">
                        <Star />
                        <span>{Math.round(movie.vote_average)} / 10</span>
                      </div>
                      <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : ""}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          
          <Link href="/">
            <Card className="w-[150px] flex flex-col items-center justify-center aspect-[3/4] bg-gray-300 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardContent className="flex items-center justify-center w-full h-full">
                <span className="text-6xl text-gray-400">+</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  )
} 