import { useEffect, useState } from "react";
import { Backend_URL } from "../config";
import axios from "axios";

export interface Blog {
    "content": string,
    "title": string,
    "id": string,
    "createdAt"?: string,
    "author": {
        "name": string
    }
}

export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${Backend_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blogs);
                setLoading(false)
            })
            .catch(e => {
                console.error(e);
                if (e.response?.status === 403 || e.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/signin";
                }
                setLoading(false);
            })
    }, [])
    return {
        loading,
        blog
    }
}

export const useFullBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${Backend_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                if (e.response?.status === 403 || e.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/signin";
                }
                setLoading(false);
            })
    }, [id])

    return {
        loading,
        blog
    }
}