import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

async function getActor(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
        accept: "application/json",
      },
    }
  );
  if (!res.ok) return null;
  return res.json();
}

async function getActorMovies(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
        accept: "application/json",
      },
    }
  );
  if (!res.ok) return [];
  const data = await res.json();

  return (data.cast || []).sort((a: any, b: any) => b.popularity - a.popularity).slice(0, 10);
}

export default async function ActorPage({ params }: { params: { id: string } }) {
  const actor = await getActor(params.id);
  if (!actor) return notFound();
  const notableMovies = await getActorMovies(params.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Profile Card */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="w-48 h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mb-4 md:mb-0">
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
        {notableMovies.length === 0 ? (
          <p className="text-gray-500">No notable movies found.</p>
        ) : (
          <div className="flex flex-row flex-wrap gap-6">
            {notableMovies.map((movie: any) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <div className="w-[200px] flex flex-col shadow-md rounded-md overflow-hidden hover:scale-105 duration-300 h-full bg-white">
                  {movie.poster_path ? (
                    <Image
                      width={300}
                      height={450}
                      alt={movie.title}
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Movie Poster</span>
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-3 justify-between min-h-0">
                    <h3 className="text-base font-semibold mb-1">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10</span>
                      <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : ""}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 