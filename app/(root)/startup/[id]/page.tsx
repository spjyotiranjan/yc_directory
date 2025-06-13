import {STARTUPBY_ID_QUERY} from "@/sanity/lib/query";
import {client} from "@/sanity/lib/client";
import {notFound} from "next/navigation";

export const experimental_ppr = true;

const StartupDetailPage = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id;

    const post = await client.fetch(STARTUPBY_ID_QUERY,{id});
    if(!post) return notFound();
    return (
        <>Page for Startup Detail : {post.title}</>
    );
};

export default StartupDetailPage;
