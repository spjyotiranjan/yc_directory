import {SearchForm} from "@/components/SearchForm";
import {StartupCard} from "@/components/StartupCard";
import {STARTUP_QUERY} from "@/sanity/lib/query";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";

export default async function Home({searchParams}: { searchParams: Promise<{ query?: string }> }) {
    const query = (await searchParams).query;

    const params = {search: query || null};
    const {data: posts} = await sanityFetch({query: STARTUP_QUERY, params});

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Pitch your Startup, <br/> Connect with Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote for pitches, and get noticed in Virtual Competitions.
                </p>
                <SearchForm query={query}/>
            </section>

            <section className={"section_container"}>
                <p className={"text-30-semibold"}>
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>

                <ul className={"mt-7 card_grid"}>
                    {posts?.length > 0 ? (posts.map((post) => (
                        <StartupCard key={post?._id} post={post}/>
                    ))
                    ) : (
                        <p className={"no-result"}> No Startups Found</p>)}
                </ul>
            </section>
            <SanityLive/>
        </>
    );
}
