import { MovieCard } from "./movie-card";

type Props = {
    movies: Movie[],
    seeMorePath: string;
}


export function MovieCardRow({ movies, seeMorePath }: Props) {
    return <div className="flex flex-row">
        {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))}
        <a href={seeMorePath}>More...</a>
    </div>

}