"use client"
import { Badge, badgeVariants } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import humanizeDuration from "humanize-duration"
import useSWR, { mutate } from 'swr'
import { dateFromString } from "@/app/utils/utils";
import { Plus, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import fetcher from "@/app/utils/fetcher";
import { CrewCardRow } from "@/app/components/crew-card-row";
import { useEffect, useState } from "react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Cookies from "js-cookie";
import { ReviewsWidget } from "@/app/components/reviews-widget";

export default function MoviePage() {
    const { id } = useParams();

    const { data: detailsData, error: detailsError, isLoading: isDetailsLoading } = useSWR<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${id}`,
        fetcher
    )

    const [rating, setRating] = useState<number>(0);
    const [watchlist, setWatchlist] = useState<boolean>(false);


    // const { data: imageData, error: imageError, isLoading: isImageLoading } = useSWR(
    //     `https://api.themoviedb.org/3/movie/${id}/images`
    // )





    const { data: accountStatesData, error: accountStatesError, isLoading: isAccountStatesLoading } = useSWR<AccountStates>(
        `https://api.themoviedb.org/3/movie/${id}/account_states`,
        fetcher,
        {
            revalidateOnFocus: true,
            revalidateIfStale: true,
        }
    )

    useEffect(() => {
        if (
            accountStatesData &&
            accountStatesData.rated
        ) {
            setRating(accountStatesData.rated.value / 2);
            setWatchlist(accountStatesData.watchlist);
        }
    }, [accountStatesData]);



    async function handleRatingChange(
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
        newRating: number
    ) {
        setRating(newRating);

        const sessionId = Cookies.get("session_id");

        const url = `https://api.themoviedb.org/3/movie/${id}/rating?session_id=${sessionId}`;

        await fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
            },
            body: JSON.stringify({ value: newRating * 2 }),
        });
    }

    async function handleWatchlistToggle() {
        const sessionId = Cookies.get("session_id");
        console.log("Session ID used for watchlist:", sessionId);
        const accountRes = await fetch(
            `https://api.themoviedb.org/3/account?session_id=${sessionId}`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
                },
            }
        );

        const accountData = await accountRes.json();
        console.log("Account fetch status:", accountRes.status, accountData);
        const accountId = accountData.id;

        const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}`;
        console.log("Watchlist URL:", url);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json;charset=utf-8",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`,
            },
            body: JSON.stringify({
                "media_type": "movie",
                "media_id": id,
                "watchlist": !watchlist
            }),
        });

        if (res.ok) {
            setWatchlist(!watchlist);
            await mutate(`https://api.themoviedb.org/3/movie/${id}/account_states`, undefined, { revalidate: true });
        }

        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({}));
            console.error("Failed to add to watchlist", res.status, url, errorBody);
        }
    }




    if (detailsError || accountStatesError) return <p>Failed to load.</p>
    if (isDetailsLoading || isAccountStatesLoading) return <p>Loading...</p>






    return <>
        <div className="flex-col md:flex-row flex gap-8">
            <Image className="w-full md:w-[300px]" alt="movie poster" width="300" height="450" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${detailsData!.poster_path}`}></Image>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl">{detailsData!.title} <span className="text-neutral-600">({dateFromString(detailsData!.release_date).getFullYear()})</span></h1>
                <div className="flex gap-4 flex-wrap">
                    <div className="flex gap-2">
                        <Star></Star>
                        <span>{detailsData!.vote_average}</span>
                    </div>
                    <Separator orientation="vertical"></Separator>
                    <div className="flex gap-2">
                        {detailsData?.genres.map((genre) => <Link key={genre.id} href={`/genre/${genre.id}`} className={badgeVariants({ variant: "outline" })}>{genre.name}</Link>)}
                    </div>
                    <Separator orientation="vertical"></Separator>
                    <Badge>{humanizeDuration(detailsData!.runtime * 60 * 1000)}</Badge>

                </div>
                <p>{detailsData?.overview}</p>
                <div className="flex gap-8 flex-row">
                    <button className="bg-red-700 flex self-start p-2 gap-1 items-center justify-center text-white rounded-sm" onClick={handleWatchlistToggle}>
                        <Plus />{watchlist ? "Remove from watchlist" : "Add to watchlist"}
                    </button>
                    <div className="flex items-center gap-4">
                        <Rating onChange={handleRatingChange} value={rating}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <RatingButton key={index} />
                            ))}
                        </Rating>
                    </div>
                </div>

            </div>
        </div>
        <div className="text-xl">
            <h2>Crew</h2>
            <CrewCardRow id={Number(id)} />
        </div>
        <div className="flex flex-col gap-1">
            <h2 className="text-xl">Reviews</h2>
            <ReviewsWidget movieId={Number(id)} />
        </div>
    </>
}