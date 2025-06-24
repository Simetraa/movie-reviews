import { MovieCard } from "./movie-card";
import { MovieCardHorizontal } from "./movie-card-horizontal";

type Props = {
    movies: Movie[],
    seeMorePath: string;
}


export function MovieCardRow({ movies, seeMorePath }: Props) {

    return <div className="flex flex-row overflow-y-scroll">
        {movies.map(movie => (
            <MovieCardHorizontal movie={movie} key={movie.id}></MovieCardHorizontal>
        ))}
        <a href={seeMorePath}>More...</a>
    </div>

}