import { z } from 'zod'
export const formSchema = z.object({
    title: z.string().min(3,"Title is too short, Please add more than 3 characters.").max(100,"Title is too long. Keep it under 100 characters."),
    description: z.string().min(20,"Description is too short, Please add more than 20 characters.").max(500,"Description is too long. Keep it under 500 characters."),
    category: z.string().min(3,"Category is too short, Please add more than 3 characters.").max(20,"Category is too long. Keep it under 20 characters."),
    link: z.string().url().refine(async(url) =>{
        try{
            const res = await fetch(url,{method: "HEAD"})
            const contentType = res.headers.get("content-type")
            return !!contentType?.startsWith('image/');
        }catch {
            return false
        }
    }),
    pitch: z.string().min(10,"Pitch is too short, Please add more than 10 characters.")
})