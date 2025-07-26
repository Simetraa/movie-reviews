import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { dateFromString } from "../utils/utils"
import { Movie } from "@/types/Movie"

type Props = {
    movie: Movie
}


export function MovieCardHorizontal({ movie }: Props) {
    return <Link href={`/movie/${movie.id}`}>
        <div className="flex w-[150px] flex-col shadow-md rounded-md overflow-hidden hover:scale-102 duration-300 h-full">
            <Image width={500} height={600} alt="" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></Image>
            <div className="flex flex-col flex-1 p-2 justify-between min-h-0">
                <h2 className="text-l font-semibold">{movie.title}</h2>
                <div className="flex items-center gap-1 justify-evenly mt-2">
                    <div className="flex gap-1">
                        <Star />
                        <span>{Math.round(movie.vote_average)} / 10</span>
                    </div>
                    <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />
                    <span>{dateFromString(movie.release_date).getFullYear().toString()}</span>
                </div>
            </div>
        </div>
    </Link>
}