import axios from "axios";
import { Appbar } from "./Appbar";
import { Backend_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full px-4">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-4"
                    placeholder="Title"
                />

                <TextEditor onChange={(e) => setDescription(e.target.value)} />

                <button
                    onClick={async () => {
                        try {
                            const response = await axios.post(`${Backend_URL}/api/v1/blog`, {
                                title,
                                content: description
                            }, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.getItem("token")
                                }
                            });
                            // Assumes backend returns { id: string } or similar
                            navigate(`/blog/${response.data.id}`);
                        } catch (e) {
                            console.error("Failed to publish post", e);
                            alert("Failed to publish post");
                        }
                    }}
                    type="submit"
                    className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 hover:bg-green-800"
                >
                    Publish Post
                </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
    return (
        <div className="w-full mb-4">
            <div className="flex items-center justify-between border rounded-lg bg-white">
                <div className="py-2 bg-white rounded-b-lg w-full">
                    <label className="sr-only">Publish post</label>
                    <textarea
                        onChange={onChange}
                        id="editor"
                        rows={8}
                        className="focus:outline-none block w-full px-4 text-sm text-gray-800 bg-white border-0"
                        placeholder="Write an article..."
                        required
                    />
                </div>
            </div>
        </div>
    );
}