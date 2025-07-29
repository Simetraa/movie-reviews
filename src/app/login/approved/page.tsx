"use client";
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function ApprovedContent() {
    const searchParams = useSearchParams();
    const requestToken = searchParams.get("request_token");
    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            if (!requestToken) return;

            const token = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`;
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ request_token: requestToken }),
            };

            const request = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, options);
            const sessionToken = await request.json();

            Cookies.set('session_id', sessionToken.session_id)
        };

        fetchSession();

        router.push("/account")

    }, [requestToken, router]);

    return <div>Processing login...</div>;
}

export default function ApprovedPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApprovedContent />
        </Suspense>
    );
}