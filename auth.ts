import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_GITHUB_ID_QUERY} from "@/sanity/lib/query";
import {writeClient} from "@/sanity/lib/writeClient";
import {JWT, Session} from "@/sanity/manualTypes";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],

    callbacks: {
        async signIn({ user, profile }) {
            const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id: profile?.id})
            if(!existingUser){
                await writeClient.create({
                    _type: 'author',
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || ''
                })
            }
            return true;
        },

        async jwt ({token,account,profile}) : Promise<JWT>{
            let updatedToken = token as JWT
            if(account && profile){
                const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id: profile?.id})
                updatedToken = {...token,id: user?._id} as JWT
            }
            return updatedToken
        },

        async session({session,token}): Promise<Session>{
            return {
                ...session,id: token.id as string
            }
        }
    }
})