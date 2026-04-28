import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    const dateToDisplay = publishedDate !== "2nd Feb 2024" || !publishedDate
        ? publishedDate
        : new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col">
                    <Avatar size="small" name={authorName} />
                </div>
                <div className="font-extralight pl-2 text-sm flex flex-col justify-center">
                    {authorName}
                </div>
                <div className="text-xs flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">{dateToDisplay}</div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + " ..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)}minute(s) read`}
            </div>

        </div>
    </Link>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div>
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>{name[0]} </span>
        </div>
    </div>
}

function Circle() {
    return <div className="flex justify-center w-1 h-1  rounded-full bg-slate-600">

    </div>
}