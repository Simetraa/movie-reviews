"use client"
import { Navbar } from "@/app/components/nav-main";
// app/product/[id]/page.tsx
import { useParams } from "next/navigation";
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function ProductPage() {
    // const { id } = useParams();


    // const { data, error, isLoading } = useSWR(
    //     'https://api.sampleapis.com/coffee/hot',
    //     fetcher
    // )

    // if (error) return <p>Failed to load.</p>
    // if (isLoading) return <p>Loading...</p>

    return <div>
        <Navbar></Navbar>
        {/* <p>{id} - npm i unfetch
            Your Data: {data[0].title}</p></div> */
        }
    </div>
}
