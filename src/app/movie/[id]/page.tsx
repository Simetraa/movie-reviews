"use client"
import { Navbar } from "@/app/components/nav-main";
import { Badge, badgeVariants } from "@/components/ui/badge";
import Image from "next/image";

import Link from "next/link";
// app/product/[id]/page.tsx
import { useParams } from "next/navigation";
import humanizeDuration, { humanizer } from "humanize-duration"
import useSWR from 'swr'

const fetcher = async (url: string) => {
    const token = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`
    const r = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: token
        }
    }
    );
    return await r.json();
}

export default function MoviePage() {
    const { id } = useParams();


    const { data: detailsData, error: detailsError, isLoading: isDetailsLoading } = useSWR(
        `https://api.themoviedb.org/3/movie/${id}`,
        fetcher
    )


    // const { data: imageData, error: imageError, isLoading: isImageLoading } = useSWR(
    //     `https://api.themoviedb.org/3/movie/${id}/images`
    // )

    if (detailsError) return <p>Failed to load.</p>
    if (isDetailsLoading) return <p>Loading...</p>



    return <>
        <Navbar></Navbar>
        <h1 className="text-2xl">{detailsData.title}</h1>
        {detailsData.genres.map((genre: any) => <Link key={genre.id} href={`/genre/${genre.id}`} className={badgeVariants({ variant: "outline" })}>{genre.name}</Link>)}
        <Image alt="movie poster" width="300" height="450" src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2${detailsData.poster_path}`}></Image>
        <Badge>{humanizeDuration(detailsData.runtime * 60 * 1000)}</Badge>
    </>
}