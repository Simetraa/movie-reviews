import useSWR from "swr";
import { Separator } from "@/components/ui/separator";
import { ShowMoreText } from "@/app/components/show-more";
import { dateFromString } from "@/app/utils/utils";
import fetcher from "../utils/fetcher";
import { PaginatedResponse } from "@/types/PaginatedResponse";
import { Star } from "lucide-react";

type Props = {
    movieId: number;
};

export function ReviewsWidget({ movieId }: Props) {
    const { data, error, isLoading } = useSWR<PaginatedResponse<Review>>(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        fetcher
    );

    if (error) return <p>Failed to load reviews.</p>;
    if (isLoading) return <div className="flex justify-center py-8"><span className="loader" /></div>;

    if (!data?.results?.length) return <p>No reviews found.</p>;

    return (
        <div className="flex flex-col gap-2">
            {data.results.map((review) => {
                const rating = review.author_details?.rating;

                return (
                    <div key={review.id} className="p-4 border rounded-md">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{review.author}</h3>
                            <Separator orientation="vertical" />
                            <span className="text text-neutral-700">
                                {dateFromString(review.created_at).toLocaleDateString()}
                            </span>
                            <>
                                <Separator orientation="vertical" />
                                <div className="flex items-center gap-1">
                                    <Star size={16} />
                                    <Separator orientation="vertical"></Separator>
                                    <span className="text-sm text-neutral-800">
                                        {Math.round(Number(rating))} / 10
                                    </span>
                                </div>
                            </>
                        </div>

                        <div className="text-sm text-neutral-700 mt-2">
                            <ShowMoreText text={review.content} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
