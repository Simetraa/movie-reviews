export default async function fetcher(url: string) {
    const token = `Bearer ${process.env.NEXT_PUBLIC_TMDB_API}`
    const r = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: token
            }
        }
    );

    if (!r.ok) {
        throw new Error("Could not fetch data")
    }
    return await r.json();
}