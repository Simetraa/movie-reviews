import useSWR from 'swr';
import fetcher from '../utils/fetcher';

type Props = {
    accountId: string;
    sessionId: string;
};

export function WatchlistRow({ accountId, sessionId }: Props) {
    const { data: watchlistData, error, isLoading } = useSWR(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?session_id=${sessionId}`,
        fetcher,
        { refreshInterval: 0, shouldRetryOnError: false }
    );

    if (error) return <p>Failed to load watchlist.</p>;
    if (isLoading) return <p>Loading watchlist...</p>;

    return (
        <div>
            {watchlistData.results.map((movie: Movie) => (
                <div key={movie.id}>{movie.title}</div>
            ))}
            <a href="/watchlist">See more</a>
        </div>
    );
}