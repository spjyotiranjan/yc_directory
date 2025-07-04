import {cn, formatDate} from "@/lib/utils";
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Author, Startup} from "@/sanity/types";
import {Skeleton} from "@/components/ui/skeleton";

export type StartupTypeCard= Omit<Startup, "author"> & { author? : Author}

export const StartupCard = ({post}: { post: any }) => {
    const {_createdAt, views, author,title,category,_id,image,description} = post;
    return (
        <li className={"startup-card group"}>
            <div className={"flex-between"}>
                <p className={"startup_card_date"}>{formatDate(_createdAt)}</p>
                <div className={"flex gap-1.5"}>
                    <EyeIcon className={"size-6 text-primary"}/>
                    <span className={"text-16-medium"}>{views}</span>
                </div>
            </div>

            <div className={"flex-between mt-5 gap-5"}>
                <div className={"flex-1"}>
                    <Link href={`/user/${author?._id}`}>
                        <p className={"text-16-medium line-clamp-1"}>
                            {author?.name}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className={"text-26-semibold line-clamp-1"}>
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <img src={author?.image || "https://placehold.co/48x48"} alt={"user logo"} className={"rounded-full w-[48px] h-auto"}/>
                </Link>
            </div>

            <Link href={`/startup/${_id}`}>
                <p className={"startup-card_desc"}>
                    {description}
                </p>

                <Image src={image || "https://placehold.co/300x200"} alt={"startup image"} width={400} height={200} className={"startup-card_img"}/>
            </Link>

            <div className={"flex-between mt-5 gap-3"}>
                <form action="/" method={"get"}>
                    <input type="hidden" name="query" value={category?.toLowerCase()} />
                    <button type="submit" className="text-16-medium cursor-pointer">
                        {category}
                    </button>
                </form>
                <Button className={"startup-card_btn"} asChild>
                    <Link href={`/startup/${_id}`}>
                        <p>
                            Details
                        </p>
                    </Link>
                </Button>
            </div>
        </li>
    );
};

export const StartupCardSkeleton = () => (
    <>
        {[1,2,3,4].map((i) => (
            <li key={cn('skeleton',i)}>
                <Skeleton className={"startup-card_skeleton"}/>
            </li>
        ))}
    </>

)