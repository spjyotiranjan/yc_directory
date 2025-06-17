import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {Session} from "@/sanity/manualTypes";
import {BadgePlus, LogIn, LogOut} from "lucide-react";

export const Navbar = async () => {
    const session: Session = await auth() as Session;
    console.log(session)
    return (
        <header className={"px-5 py-3 bg-white shadow-sm font-work-sans"}>
            <nav className={"flex justify-between items-center"}>
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} priority={true} />
                </Link>

                <div className={"flex items-center gap-5 text-black"}>
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className={"max-sm:hidden"}>Create</span>
                                <BadgePlus className={"size-5 sm:hidden"}/>
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({redirectTo: "/"})
                            }}>
                                <button className={"cursor-pointer flex justify-center items-center"} type={"submit"}>
                                    <span className={"max-sm:hidden"}>Logout</span>
                                    <LogOut color={"red"}  className={"size-5 sm:hidden text-red-500"}/>
                                </button>
                            </form>

                            <Link href={`user/${session?.id}`}>
                                <Image src={session?.user?.image || "https://placehold.co/48x48"} alt={"user logo"} width={35} height={35} className={"rounded-full"}/>
                            </Link>
                        </>
                    ) : (
                        <form className={'cursor-pointer'} action={async() => {
                            "use server"
                            await signIn("github")
                        }}>
                            <button className={"cursor-pointer flex justify-center items-center"} type={"submit"}>
                                <span className={"max-sm:hidden"}>Login</span>
                                <LogIn className={"size-5 sm:hidden"} />
                            </button>
                        </form>
                    )
                    }
                </div>
            </nav>
        </header>
    );
};
