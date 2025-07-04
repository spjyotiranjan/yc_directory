import Form from "next/form";
import {SearchFormReset} from "@/components/SearchFormReset";
import {Search} from "lucide-react";

export const SearchForm = ({query}:{query?: string}) => {

    return (
        <Form action={"/"} scroll={false} className={"search-form"}>
            <input
                name={"query"}
                defaultValue={query ?? ""}
                className={"search-input"}
                placeholder={"Search Startups"}
            />

            <div className={"flex gap-2"}>
                {query && <SearchFormReset />}
                <button type={"submit"} className={"search-btn cursor-pointer"}>
                    <Search className={"size-5"} color={"white"} />
                </button>
            </div>
        </Form>
    );
};
