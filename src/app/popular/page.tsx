import { MovieCardHorizontal } from "../components/movie-card-horizontal"
import fetcher from "../utils/fetcher"

import useSWR from "swr"

export default function PopularPage() {
    const { data: popularData, error: popularError, isLoading: isPopularLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/popular`,
        fetcher
    )


    // const { data: imageData, error: imageError, isLoading: isImageLoading } = useSWR(
    //     `https://api.themoviedb.org/3/movie/${id}/images`
    // )

    if (popularError) return <p>Failed to load.</p>
    if (isPopularLoading) return <p>Loading...</p>

    return <>
        {popularData.results.map((movie: Movie) => {
            <MovieCardHorizontal movie={movie}></MovieCardHorizontal>
        })}
    </>
}