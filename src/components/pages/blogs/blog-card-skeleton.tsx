
export const BlogCardSkeleton = () => {
    return (
        <div className="block group">
            <div className="relative w-full h-[20rem] bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="mt-4 h-6 w-3/4 bg-gray-700 rounded animate-pulse"></div>
            <div className="mt-2 h-4 w-full bg-gray-700 rounded animate-pulse"></div>
            <div className="mt-1 h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
        </div>
    );
};
