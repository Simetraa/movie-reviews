'use client'

import useSWR from "swr";
import fetcher from "@/app/utils/fetcher";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { MovieCardHorizontal } from "@/app/components/movie-card-horizontal";
import { ListDetails, ListItem } from "@/types/ListDetails";


export default function ListPage() {
    const { id } = useParams();

    const { data, error, isLoading } = useSWR<ListDetails>(
        id? `https://api.themoviedb.org/3/list/${id}` : null,
        fetcher
    )

    const [visibleItems, setVisibleItems] = useState<ListItem[]>([]);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        if (data?.items) {
            setVisibleItems(data.items.slice(0, ITEMS_PER_PAGE));
            setPage(1);
        }
    }, [data]);

    const loadMore = () => {
        if (!data?.items) return;
        const nextPage = page + 1;
        const start = nextPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const moreItems = data.items.slice(start, end);

        if (moreItems.length > 0) {
            setVisibleItems((prev) => [...prev, ...moreItems]);
            setPage(nextPage);
        }
    };


    if (error) return <p>Failed to load.</p>
    if (isLoading) return <p>Loading...</p>

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{data?.name}</h1>
                <p className="text-muted-foreground">{data?.description}</p>
            </div>
            <InfiniteScroll
                isLoading={false}
                next={loadMore}
                hasMore={visibleItems.length < (data?.items.length ?? 0)}
            >
                <div className="grid gap-4">
                    {visibleItems.map((movie) => (
                        <MovieCardHorizontal key={movie.id} movie={movie} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
}