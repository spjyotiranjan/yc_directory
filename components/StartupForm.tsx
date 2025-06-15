"use client"

import React, {useActionState, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import {Button} from "@/components/ui/button";
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from 'zod';
import {toast} from "sonner"
import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/actions";


const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState("")
    const router = useRouter()
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }

            await formSchema.parseAsync(formValues)
            const result = await createPitch(prevState, formData, pitch)
            if (result.status === "SUCCESS") {
                toast.success("Success", {
                    duration: 5000,
                    description: () => {
                        return <div className={"text-white"}>
                            <p>Your pitch has been submitted successfully</p>
                            <p>Redirecting, Manually Re-direct to Pitch by clicking <a href={`/startup/${result._id}`}
                                                                                       className={"text-white"}><b
                                className={"no-underline hover:underline"}>here</b></a></p>
                        </div>
                    },

                    position: "top-center",
                    style: {
                        backgroundColor: '#0aa849', // Tailwind red-600
                        color: 'white',
                        border: "none"
                    },
                })
            }
            setTimeout(() => {
                router.push(`/startup/${result._id}`)
            },5000)
            return result
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                const firstErrorEntry = Object.entries(fieldErrors)[0];
                if (firstErrorEntry[0] === "link") {
                    firstErrorEntry[0] = "image"
                }
                setErrors(fieldErrors as unknown as Record<string, string>);
                toast.error("Validation Error", {
                    description: () => {
                        return <div className={"text-white"}>
                            <p className={"mb-[4px]"}>
                                <b>
                                    {firstErrorEntry[0].toUpperCase()}:
                                </b>{' '}
                                <span>{firstErrorEntry[1]?.[0]}</span>
                            </p>
                        </div>
                    },
                    duration: 5000,
                    position: "top-center",
                    style: {
                        backgroundColor: '#b12626', // Tailwind red-600
                        color: 'white',
                        border: "none"
                    },
                })

                return {...prevState, error: "Validation Error", status: "ERROR"}
            }

            return {...prevState, error: "An unexpected error has occured", status: "ERROR"}
        } finally {

        }
    }
    const [state,formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"});


    return (
        <form action={formAction} className={"startup-form"}>
            <div>
                <label className={"startup-form_label"} htmlFor={"title"}>Title</label>
                <Input id={"title"} name={"title"} className={"startup-form_input"} required
                       placeholder={"Startup Title"}/>
                {errors.title && <p className={"startup-form_error"}>{errors.title}</p>}
            </div>
            <div>
                <label className={"startup-form_label"} htmlFor={"description"}>Decription</label>
                <Textarea id={"description"} name={"description"} className={"startup-form_textarea"} required
                          placeholder={"Startup Description"}/>
                {errors.description && <p className={"startup-form_error"}>{errors.description}</p>}
            </div>
            <div>
                <label className={"startup-form_label"} htmlFor={"category"}>Category</label>
                <Input id={"category"} name={"category"} className={"startup-form_input"} required
                       placeholder={"Startup Category{Tech,Health,Finance,etc.}"}/>
                {errors.category && <p className={"startup-form_error"}>{errors.category}</p>}
            </div>
            <div>
                <label className={"startup-form_label"} htmlFor={"link"}>Image</label>
                <Input id={"link"} name={"link"} className={"startup-form_input"} required
                       placeholder={"Startup Image(url)"}/>
                {errors.link && <p className={"startup-form_error"}>{errors.link}</p>}
            </div>
            <div data-color-mode="light">
                <label className={"startup-form_label"} htmlFor={"pitch"}>Pitch</label>
                <MDEditor value={pitch}
                          onChange={(e) => {
                              setPitch(e as string)
                          }}
                          id={"pitch"} preview="edit" style={{height: 300, borderRadius: 20, overflow: "hidden"}}
                          textareaProps={{
                              placeholder: "Briefly and neatly describe your ideas and what problem it solves",
                          }}
                          previewOptions={{
                              disallowedElements: ["style"]
                          }}
                />
                {errors.pitch && <p className={"startup-form_error"}>{errors.pitch}</p>}
            </div>
            <Button type={"submit"} className={"startup-form_btn"} disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
                <Send className={"size-5 ml-2"}/>
            </Button>
        </form>
    );
};

export default StartupForm;
