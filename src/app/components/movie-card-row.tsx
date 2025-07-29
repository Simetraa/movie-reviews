import { MovieCard } from "./movie-card";
import { MovieCardHorizontal } from "./movie-card-horizontal";

type Props = {
    movies: Movie[],
    seeMorePath: string;
}


export function MovieCardRow({ movies }: { movies: Movie[] }) {
    return <div className="flex flex-row overflow-x-scroll overflow-y-clip gap-x-4">
        {movies.map(movie => (
            <MovieCardHorizontal movie={movie} key={movie.id}></MovieCardHorizontal>
        ))}
    </div>
}