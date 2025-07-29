
"use client";
import Cookies from 'js-cookie'
import {redirect, useSearchParams} from "next/navigation";
import {useEffect} from "react";


export default function ApprovedPage() {
    const searchParams = useSearchParams();
    const requestToken = searchParams.get("request_token");

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

            let request = await fetch(`https://api.themoviedb.org/3/authentication/session/new`, options);
            let sessionToken = await request.json();


            Cookies.set('session_id', sessionToken.session_id)
        };

        fetchSession();

        redirect("/account")

    }, [requestToken]);
}