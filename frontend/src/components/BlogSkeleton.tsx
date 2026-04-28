export const BlogSkeleton = () => {
    return <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md animate-pulse">
        <div className="flex items-center">
            <div className="flex justify-center flex-col">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="pl-2 flex justify-center flex-col">
                <div className="h-2 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="pl-2 flex justify-center flex-col">
                <div className="h-1 w-1 bg-gray-200 rounded-full"></div>
            </div>
            <div className="pl-2 flex justify-center flex-col">
                <div className="h-2 bg-gray-200 rounded-full w-16"></div>
            </div>
        </div>
        <div className="pt-4">
            <div className="h-4 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        </div>
        <div className="pt-2">
            <div className="h-2 bg-gray-200 rounded-full max-w-[500px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full max-w-[330px]"></div>
        </div>
        <div className="pt-4">
            <div className="h-2 bg-gray-200 rounded-full w-24"></div>
        </div>
    </div>
}