import {Skeleton} from "@/components/ui/skeleton";

export function MovieCardHorizontalSkeleton() {
    return (
        <div className="flex max-w-[200px] flex-col shadow-md rounded-md overflow-hidden h-full">
            <Skeleton className="w-full aspect-[5/7]" />
            <div className="flex flex-col flex-1 p-2 justify-between min-h-0">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <div className="flex items-center gap-1 justify-evenly mt-2">
                    <div className="flex gap-1">
                        <Skeleton className="w-4 h-4 rounded-full" />
                        <Skeleton className="h-4 w-8" />
                    </div>
                    <Skeleton className="w-px h-4" />
                    <Skeleton className="h-4 w-8" />
                </div>
            </div>
        </div>
    );
}