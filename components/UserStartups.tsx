import React from 'react';
import {client} from "@/sanity/lib/client";
import {STARTUP_BY_AUTHOR_QUERY} from "@/sanity/lib/query";
import {StartupCard} from "@/components/StartupCard";

const UserStartups = async ({id}: { id: string }) => {
    const startups = await client.fetch(STARTUP_BY_AUTHOR_QUERY, {id});

    return (
        <>
            {startups.length > 0 ? startups.map((startup) => (
                <StartupCard key={startup?._id} post={startup}/>
            )): <p className={"no-result"}>No Startups Yet</p>}
        </>
    );
};

export default UserStartups;
