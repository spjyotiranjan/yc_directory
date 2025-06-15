"use server"

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/writeClient";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
        const session: any = await auth();
        if(!session) return parseServerActionResponse({error: "You must be logged in to create a pitch",status: "ERROR"})
        const {title, description, category, link} = Object.fromEntries(
            Array.from(form).filter(([key])=> key !== "pitch")
        )

        const slug = slugify(title as string, {lower: true,strict: true})

        try {
                const startup = {
                        title,
                        description,
                        category,
                        image: link,
                        slug: {
                                _type: "slug",
                                current: slug
                        },
                        author: {
                                _type: "reference",
                                _ref: session?.id
                        },
                        pitch,
                        views: 0,
                }

                const result = await writeClient.create({_type: "startup",...startup})
                return parseServerActionResponse({...result,error: "",status: "SUCCESS"})
        }catch (error) {
                console.log(error)

                return parseServerActionResponse({error: JSON.stringify(error),status: "ERROR"})
        }
}