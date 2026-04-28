import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import type { Blog } from "../hooks";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd Feb 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 pl-10">
                    <div className="text-slate-600 space-y-2">
                        Author
                    </div>
                    <div className="flex pt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author?.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author?.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Master of mirth, purveyor of puns, and the funniest person in the kingdom.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}