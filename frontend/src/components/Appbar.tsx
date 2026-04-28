import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    const navigate = useNavigate();
    return <div className="border-b border-slate-200 flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center cursor-pointer">
            <Link to={"/blog"}>
                Medium
            </Link>
        </div>
        <div className="flex flex-cols ">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    New
                </button>
            </Link>

            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
            }} type="button" className="mr-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                Logout
            </button>

            <Avatar size={"big"} name="Harry" />
        </div>
    </div>
}