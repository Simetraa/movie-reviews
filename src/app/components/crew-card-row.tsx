import Image from 'next/image';
import Link from 'next/link';
import fetcher from '../utils/fetcher';
import { Spinner } from '@/components/ui/spinner';
import useSWR from 'swr';

export function CrewCardRow({ id }: { id: number }) {
    const { data: creditsDetails, error: creditsError, isLoading: isCreditsLoading } = useSWR<Credits>(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        fetcher
    )

    const members = creditsDetails?.cast || [];

    if (creditsError) return <p>Failed to load crew details.</p>;
    if (isCreditsLoading) return <Spinner />;

    return (
        <div className="flex flex-row overflow-x-scroll overflow-y-clip gap-x-4">
            {members.map((member: CastMember) => (
                <Link key={member.credit_id} href={`/actor/${member.id}`}>
                    <div className="flex w-[150px] flex-col shadow-md rounded-md overflow-hidden hover:scale-102 duration-300 h-full">
                        <Image width={500} height={600} alt={member.name} src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} />
                        <div className="flex flex-col flex-1 p-2 justify-between min-h-0">
                            <h2 className="text-sm">{member.name}</h2>
                            <span className="text-sm text-neutral-500">{member.character}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}