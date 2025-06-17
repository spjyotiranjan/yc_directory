import {PLAYLIST_BY_SLUG_QUERY, STARTUPBY_ID_QUERY} from "@/sanity/lib/query";
import {client} from "@/sanity/lib/client";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import markdownit from "markdown-it"
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {View} from "@/components/View";
import {StartupCard, StartupTypeCard} from "@/components/StartupCard";
const md = markdownit()


export const experimental_ppr = true;

const StartupDetailPage = async ({params}: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const [post,{select}] = await Promise.all([
        client.fetch(STARTUPBY_ID_QUERY, {id}),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks"})
    ])

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch || "")
    return (
        <>
            <section className={"pink_container !min-h-[230px]"}>
                <p className={"tag"}>{formatDate(post._createdAt)}</p>
                <h1 className={"heading"}>{post.title}</h1>
                <p className={"sub-heading !max-w-5xl"}>{post.description}</p>
            </section>

            <section className={"section_container"}>
                <img src={post.image || "https://placehold.co/500x300"} alt={"thumbnail"}
                     className={"w-full h-auto rounded-xl"}/>
                <div className={"space-y-5 mt-10 max-w-4xl mx-auto"}>
                    <div className={"flex-between gap-5"}>
                        <Link className={"flex gap-2 items-center mb-3"} href={`user/${post?.author?._id}`}>
                            <Image src={post.author?.image || "https://placehold.co/64x64"} alt={"avatar"} width={64}
                                   height={64} className={"rounded-full drop-shadow-lg"}/>
                            <div>
                                <p className={"text-20-medium"}>{post.author?.name}</p>
                                <p className={"text-16-medium !text-black-300"}>@{post.author?.username}</p>
                            </div>
                        </Link>
                        <Link className={"category-tag"} href={`/?query=${post.category?.toLowerCase()}`}>
                            <p>{post.category}</p>
                        </Link>
                    </div>
                    <h3 className={"text-30-bold"}>Pitch Details</h3>
                    {parsedContent ? (
                        <article className={"prose max-w-4xl font-work-sans break-all"}
                            dangerouslySetInnerHTML={{__html: parsedContent}}
                        />
                    ):(
                        <p className={"no-result"}>No pitch provided</p>
                    )}
                </div>

                <hr className={"divider"}/>
                <Suspense fallback={<Skeleton className={"view_skeleton"}/>}>
                    <View id={id}/>
                </Suspense>

                {select?.length > 0 && (
                    <div className={"max-w-4xl mx-auto"}>
                        <p className={"text-30-semibold"}>Editor Picks</p>

                        <ul className={"mt-7 card_grid-sm"}>
                            {select?.map((post: StartupTypeCard,index: number)=> (
                                <StartupCard key={index} post={post}/>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        </>
    );
};

export default StartupDetailPage;
