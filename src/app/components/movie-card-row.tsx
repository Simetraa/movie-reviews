import { Movie } from "@/types/Movie";
import { MovieCardHorizontal } from "./movie-card-horizontal";
import fetcher from "../utils/fetcher";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import type { PaginatedResponse } from "@/types/PaginatedResponse";

type Props = {
    url: string,
    seeMorePath: string;
}


export function MovieCardRow({url, seeMorePath}: Props) {
    const {data: data, error: error, isLoading: isLoading} = useSWR<PaginatedResponse<Movie>>(
        url,
        fetcher
    )

    if (error) return <p>Failed to load.</p>
    if (isLoading) return <div className="flex flex-row overflow-x-scroll overflow-y-clip gap-x-4">
        {[...Array(30)].map((_, index) => (
            <Skeleton className="w-[150px] h-[321px] flex-shrink-0" key={index}></Skeleton>
        ))}
        <a href={seeMorePath}>More...</a>
    </div>

    return <div className="flex flex-row overflow-x-scroll overflow-y-clip gap-x-4">
        {data!.results.map((movie: Movie) => (
            <MovieCardHorizontal movie={movie} key={movie.id}></MovieCardHorizontal>
        ))}
        <a href={seeMorePath}>More...</a>
    </div>
}