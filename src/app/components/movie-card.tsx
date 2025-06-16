type Props = {
    movie: Movie,
}

export function MovieCard({ movie }: Props) {
    return <div>{movie.title}
        <div>{movie.release_date}</div>
    </div>
}