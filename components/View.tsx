import {Ping} from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_VIEW_QUERY} from "@/sanity/lib/query";
import {writeClient} from "@/sanity/lib/writeClient";
import {after} from 'next/server'

export const View = async ({id}: { id: string }) => {
    const res = await client.fetch(
        STARTUP_VIEW_QUERY,
        {id}
    );

    after(async () => {
        if (res?.views) {
            await writeClient.patch(id).set({views: res?.views + 1}).commit();

        }
    })

    return (
        <div className={"view-container"}>
            <div className={"absolute -top-2 -right-2"}>
                <Ping/>
            </div>
            <p className={"view-text"}>
                <span className={"font-black"}>{res?.views} {res?.views == 1 ? "View" : "Views"}</span>
            </p>

        </div>
    );
};
