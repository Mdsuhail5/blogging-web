import { Appbar } from "./Appbar"

export const FullBlogSkeleton = () => {
    return <div>
        <Appbar />
        <div className="flex justify-center animate-pulse">
            <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl">
                <div className="col-span-8">
                    <div className="h-10 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-8"></div>

                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-4/6 mb-2"></div>
                </div>
                <div className="col-span-4 pl-10">
                    <div className="h-4 bg-gray-200 rounded-full w-1/4 mb-4"></div>
                    <div className="flex pt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="w-full">
                            <div className="h-5 bg-gray-200 rounded-full w-1/2 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-full mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}