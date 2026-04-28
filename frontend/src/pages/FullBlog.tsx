import { useParams } from "react-router-dom";
import { useFullBlog } from "../hooks";
import { FullBlog as FullBlogComponent } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";

export const FullBlog = () => {
    const { id } = useParams<{ id: string }>();
    const { loading, blog } = useFullBlog({ id: id || "" });

    if (loading || !blog) {
        return <FullBlogSkeleton />
    }

    return <FullBlogComponent blog={blog} />
}